import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRequestRideStore } from '../hooks/useRequestRideStore';
import { useRideOptionsStore } from '../hooks/useRideOptionsStore';
import ErrorAlert from '../components/errorAlert';
import axios from 'axios';

const RequestRide: React.FC = () => {
  const [customerId, setCustomerId] = useState('');
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [error, setError] = useState('');
  const { setRequestRideDetails } = useRequestRideStore();
  const { setRideDetails, setOptions } = useRideOptionsStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/ride/estimate', {
        customer_id: customerId,
        origin: originInput,
        destination: destinationInput,
      });

      const { origin, destination, options, distance, duration } = response.data;
      console.log(response.data);
      setRequestRideDetails(customerId, originInput, destinationInput);
      setRideDetails(
        { latitude: origin.latitude, longitude: origin.longitude },
        { latitude: destination.latitude, longitude: destination.longitude },
        distance,
        duration
      );

      setOptions(options);
      navigate('/options');
    } catch (error) {
      console.error('Erro ao solicitar estimativa:', error);
      alert('Erro ao solicitar estimativa. Tente novamente.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <ErrorAlert message={error} onClose={() => setError('')} />
      <h1 className="text-2xl font-bold mb-4">Solicitar Viagem</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="customerId">
            ID do Usuário
          </label>
          <input
            type="text"
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="origin">
            Endereço de Origem
          </label>
          <input
            type="text"
            id="origin"
            value={originInput}
            onChange={(e) => setOriginInput(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="destination">
            Endereço de Destino
          </label>
          <input
            type="text"
            id="destination"
            value={destinationInput}
            onChange={(e) => setDestinationInput(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Estimar Viagem
        </button>
      </form>
    </div>
  );
};

export default RequestRide;
