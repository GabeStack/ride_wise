import React, { useState } from 'react';
import axios from 'axios';
import ErrorAlert from '../components/errorAlert';
import { DateTime } from 'luxon';

interface Driver {
  id: number;
  name: string;
}

interface Ride {
  id: number;
  date: string;
  driver: Driver; // Atualizado para refletir a estrutura correta
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
}

const HistoricoDeViagens: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [driverId, setDriverId] = useState<string>('todos');
  const [rides, setRides] = useState<Ride[]>([]);
  const [error, setError] = useState('');

  const fetchRides = async () => {
    try {
      // Corrigir a URL para enviar o customerId na URL e driverId como parâmetro de query
      const response = await axios.get(`http://localhost:8080/ride/${userId}`, {
        params: {
          driver_id: driverId === 'todos' ? '' : driverId, // Se "todos", não envia o driver_id
        },
      });

      setRides(response.data.rides); // Atualizando a lista de viagens com os dados recebidos
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      alert('Erro ao buscar histórico de viagens. Tente novamente.');
    }
  };

  const formatDate = (isoDate: string) => {
    return DateTime.fromISO(isoDate).setLocale('pt-BR').toFormat('dd/MM/yyyy HH:mm:ss');
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ErrorAlert message={error} onClose={() => setError('')} /> {/* Exibindo erros */}
      <h1 className="text-2xl font-bold mb-4">Histórico de Viagens</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mb-6">
        <div className="mb-4">
          <label htmlFor="userId" className="block text-gray-700 font-bold mb-2">
            ID do Usuário
          </label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="driverId" className="block text-gray-700 font-bold mb-2">
            Selecione um Motorista
          </label>
          <select
            id="driverId"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="todos">Todos</option>
            <option value="1">Homer Simpson</option>
            <option value="2">Dominic Toretto</option>
            <option value="3">James Bond</option>
          </select>
        </div>

        <button
          onClick={fetchRides}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Aplicar Filtro
        </button>
      </div>

      <div className="w-full max-w-4xl">
        {rides.length > 0 ? (
          rides.map((ride) => (
            <div key={ride.id} className="bg-white p-4 rounded shadow-md mb-4">
              <p className="font-bold">Data: {formatDate(ride.date)}</p>
              <p><strong>Motorista:</strong> {ride.driver.name}</p> {/* Modificado para acessar o nome do motorista de 'driver' */}
              <p><strong>Origem:</strong> {ride.origin}</p>
              <p><strong>Destino:</strong> {ride.destination}</p>
              <p><strong>Distância:</strong> {ride.distance} km</p>
              <p><strong>Duração:</strong> {ride.duration}</p>
              <p><strong>Valor:</strong> R$ {ride.value.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma viagem encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default HistoricoDeViagens;
