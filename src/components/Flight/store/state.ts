import { Flight } from '../../../services/flights';

export interface FlightState {
  selectedFlight?: Flight;
}

export const flightInitialState: FlightState = {
  selectedFlight: undefined,
};
