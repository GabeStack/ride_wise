import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import EstimateValidator from "App/Validators/EstimateValidator";
import { validator } from "@ioc:Adonis/Core/Validator";
import Ride from "App/Models/Ride";
import Driver from 'App/Models/Driver'
import axios from "axios";
import "dotenv/config";
import ConfirmValidator from "App/Validators/ConfirmValidator";

export default class RidesController {
  public async estimate({ request, response }: HttpContextContract) {
    // Validação da requisição
    const data = await request.validate({
      schema: EstimateValidator.schema,
      data: request.all(),
      messages: EstimateValidator.messages,
    })

    // Verificação de origem e destino
    if (data.origin === data.destination) {
      return response.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Origin and destination cannot be the same.',
      })
    }

    const apiKey = process.env.API_GOOGLE
    const googleMapsUrl = `https://routes.googleapis.com/directions/v2:computeRoutes`

    try {
      const { data: routeData } = await axios.post(
        googleMapsUrl,
        {
          origin: { address: data.origin },
          destination: { address: data.destination },
          travelMode: 'DRIVE',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask':
              'routes.distanceMeters,routes.duration,routes.polyline,routes.legs.startLocation,routes.legs.endLocation',
          },
        }
      )

      if (!routeData.routes || routeData.routes.length === 0) {
        return response.status(400).json({
          error_code: 'INVALID_DATA',
          error_description: 'Unable to calculate route.',
        })
      }

      const route = routeData.routes[0]
      const leg = route.legs[0]
      const distance = route.distanceMeters / 1000
      const duration = route.duration

      const originLocation = leg.startLocation.latLng
      const destinationLocation = leg.endLocation.latLng
      const drivers = await Driver.query().preload('reviews')

      const availableDrivers = drivers
        .filter((driver) => distance >= driver.minKm)
        .map((driver) => {
          const driverReview = driver.reviews.reduce(
            (acc, review) => acc + review.rating, 0
          ) / driver.reviews.length;

          return {
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: driver.vehicle,
            review: {
              rating: driverReview,
              comment: driver.reviews.map((r) => r.comment).join(', '),
            },
            value: parseFloat((driver.ratePerKm * distance).toFixed(2)),
          }
        })
        .sort((a, b) => a.value - b.value)

      return response.status(200).json({
        origin: {
          latitude: originLocation.latitude,
          longitude: originLocation.longitude,
        },
        destination: {
          latitude: destinationLocation.latitude,
          longitude: destinationLocation.longitude,
        },
        distance,
        duration,
        options: availableDrivers,
        routeResponse: routeData,
      })
    } catch (error) {
      console.error(error.response?.data || error.message)
      return response.status(500).json({
        error_code: 'INTERNAL_ERROR',
        error_description: 'An error occurred while processing your request.',
      })
    }
  }


  public async confirm({ request, response }: HttpContextContract) {
    const data = await validator.validate({
      schema: ConfirmValidator.schema,
      data: request.all(),
      messages: ConfirmValidator.messages,
    });

    if (data.origin === data.destination) {
      return response.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "Origin and destination cannot be the same.",
      });
    }

    const selectedDriver = await Driver.find(data.driver.id);

    if (!selectedDriver) {
      return response.status(404).json({
        error_code: "DRIVER_NOT_FOUND",
        error_description: "Driver not found.",
      });
    }

    if (data.distance < selectedDriver.minKm) {
      return response.status(406).json({
        error_code: "INVALID_DISTANCE",
        error_description: `Distance (${data.distance} km) is below the minimum required for this driver.`,
      });
    }

    try {
      const ride = new Ride();
      ride.customer_id = data.customer_id;
      ride.origin = data.origin;
      ride.destination = data.destination;
      ride.distance = data.distance;
      ride.duration = data.duration;
      ride.driver_id = data.driver.id;
      ride.driver_name = data.driver.name;
      ride.value = data.value;

      await ride.save();

      return response.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error_code: "INTERNAL_ERROR",
        error_description: "An error occurred while saving the ride.",
      });
    }
  }
  
  public async show({ params, request, response }: HttpContextContract) {
    const customerId = params.customer_id
    const driverId = request.qs().driver_id

    if (!customerId) {
      return response.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Customer ID cannot be empty.',
      })
    }

    if (driverId) {
      const driverExists = await Driver.find(driverId)
      if (!driverExists) {
        return response.status(400).json({
          error_code: 'INVALID_DRIVER',
          error_description: `Driver with ID ${driverId} not found.`,
        })
      }
    }

    try {
      const query = Ride.query().where('customer_id', customerId).orderBy('created_at', 'desc')

      if (driverId) {
        query.where('driver_id', driverId)
      }

      const rides = await query

      if (rides.length === 0) {
        return response.status(404).json({
          error_code: 'NO_RIDES_FOUND',
          error_description: 'No rides found for the given criteria.',
        })
      }

      const formattedRides = rides.map((ride) => ({
        id: ride.id,
        date: ride.createdAt,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        driver: {
          id: ride.driver_id,
          name: ride.driver_name,
        },
        value: ride.value,
      }))

      return response.status(200).json({
        customer_id: customerId,
        rides: formattedRides,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        error_code: 'INTERNAL_ERROR',
        error_description: 'An error occurred while fetching the rides.',
      })
    }
  }
}
