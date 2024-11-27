import { create } from 'zustand';

interface RequestRideState {
  customerId: string;
  originInput: string; // Endereço de origem
  destinationInput: string; // Endereço de destino
  setRequestRideDetails: (customerId: string, originInput: string, destinationInput: string) => void;
}

export const useRequestRideStore = create<RequestRideState>((set) => ({
  customerId: '', // Inicializa com um valor vazio
  originInput: '', // Inicializa com valor vazio
  destinationInput: '', // Inicializa com valor vazio
  
  setRequestRideDetails: (customerId, originInput, destinationInput) =>
    set({ customerId, originInput, destinationInput }),
}));
