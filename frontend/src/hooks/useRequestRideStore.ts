import { create } from 'zustand';

interface RequestRideState {
  customerId: string;
  originInput: string;
  destinationInput: string;
  setRequestRideDetails: (customerId: string, originInput: string, destinationInput: string) => void;
}

export const useRequestRideStore = create<RequestRideState>((set) => ({
  customerId: '', 
  originInput: '',
  destinationInput: '',
  
  setRequestRideDetails: (customerId, originInput, destinationInput) =>
    set({ customerId, originInput, destinationInput }),
}));
