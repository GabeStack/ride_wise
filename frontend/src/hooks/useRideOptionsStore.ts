import { create } from 'zustand';

interface DriverOption {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface RideOptionsState {
  origin: Coordinates;
  destination: Coordinates;
  distance: number;
  duration: string; 
  options: DriverOption[]; 

  setRideDetails: (origin: Coordinates, destination: Coordinates, distance: number, duration: string) => void;
  setOptions: (options: DriverOption[]) => void;
}

export const useRideOptionsStore = create<RideOptionsState>((set) => ({
  origin: { latitude: 0, longitude: 0 },
  destination: { latitude: 0, longitude: 0 },
  distance: 0,
  duration: '',
  options: [],
  
  setRideDetails: (origin, destination, distance, duration) =>
    set({ origin, destination, distance, duration }),

  setOptions: (options) => set({ options }),
}));
