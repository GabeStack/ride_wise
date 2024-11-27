import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ErrorAlert from '../components/errorAlert';
import { useRequestRideStore } from '../hooks/useRequestRideStore';
import { useRideOptionsStore } from '../hooks/useRideOptionsStore';
import axios from 'axios';

const RideOptions: React.FC = () => {
    const { originInput, destinationInput, customerId } = useRequestRideStore();
    const { origin, destination, options, distance, duration } = useRideOptionsStore();
    const [error, setError] = useState('');
    const originCoords: LatLngExpression = [origin.latitude, origin.longitude];
    const destinationCoords: LatLngExpression = [destination.latitude, destination.longitude];

    const originIcon = new Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // Caminho do ícone padrão do Leaflet
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    const destinationIcon = new Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // Caminho do ícone padrão do Leaflet
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    const confirmRide = async (driverId: number) => {
        try {
            const selectedDriver = options.find(driver => driver.id === driverId);

            if (!selectedDriver) {
                alert("Motorista não encontrado.");
                return;
            }

            const rideData = {
                customer_id: customerId,
                origin: originInput,
                destination: destinationInput,
                distance,
                duration,
                driver: {
                    id: selectedDriver.id,
                    name: selectedDriver.name,
                },
                value: selectedDriver.value,
            };
            console.log(rideData)
            await axios.post('http://localhost:8080/ride/confirm', rideData);

            window.location.href = '/historico';
        } catch (error) {
            console.error('Erro ao confirmar viagem:', error);
            alert('Erro ao confirmar a viagem. Tente novamente.');
        }
    };

    console.log(originCoords, destinationCoords)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <ErrorAlert message={error} onClose={() => setError('')} />
            <h1 className="text-2xl font-bold mb-4">Opções de Viagem</h1>
            {/* Mapa com Leaflet */}
            <div className="w-full max-w-4xl mb-6">
                <MapContainer
                    center={originCoords}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: '400px', width: '100%' }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={originCoords} icon={originIcon}>
                        <Popup>Origem</Popup>
                    </Marker>
                    <Marker position={destinationCoords} icon={destinationIcon}>
                        <Popup>Destino</Popup>
                    </Marker>
                </MapContainer>
            </div>

            {/* Lista de Motoristas */}
            <div className="grid grid-cols-1 gap-4 w-full max-w-2xl">
                {options.map((driver) => (
                    <div key={driver.id} className="bg-white p-4 rounded shadow-md flex flex-col">
                        <h2 className="text-lg font-bold">{driver.name}</h2>
                        <p className="text-gray-600">{driver.description}</p>
                        <p className="text-gray-800">Veículo: {driver.vehicle}</p>
                        <p className="text-gray-800">Avaliação: {driver.review.rating}/5</p>
                        <p className="text-gray-800">Comentário: {driver.review.comment}</p>
                        <p className="text-blue-600 font-bold">Valor: R$ {driver.value.toFixed(2)}</p>
                        <button
                            onClick={() => { confirmRide(driver.id); }}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Escolher
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RideOptions;
