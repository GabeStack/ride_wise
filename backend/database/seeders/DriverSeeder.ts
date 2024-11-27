import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Driver from 'App/Models/Driver'
import Review from 'App/Models/Review'

export default class DriverSeeder extends BaseSeeder {
  public async run() {
    // Criar os motoristas
    const drivers = await Driver.createMany([
      {
        name: 'Homer Simpson',
        description: 'Motorista com direito a rosquinhas!',
        vehicle: 'Plymouth Valiant 1973',
        ratePerKm: 2.5,
        minKm: 1,
      },
      {
        name: 'Dominic Toretto',
        description: 'Motorista rápido e seguro.',
        vehicle: 'Dodge Charger R/T 1970',
        ratePerKm: 5.0,
        minKm: 5,
      },
      {
        name: 'James Bond',
        description: 'Motorista classe A para uma experiência secreta.',
        vehicle: 'Aston Martin DB5',
        ratePerKm: 10.0,
        minKm: 10,
      },
    ])

    await Review.createMany([
      {
        driver_id: drivers[0].id,
        rating: 2,
        comment: 'Motorista simpático, mas errou o caminho 3 vezes.',
      },
      {
        driver_id: drivers[1].id,
        rating: 4,
        comment: 'Que viagem incrível!',
      },
      {
        driver_id: drivers[2].id,
        rating: 5,
        comment: 'Serviço impecável!',
      },
    ])
  }
}
