import { Airport } from '../../../services/airports';

export interface AirportState {
  selectedAirport?: Airport;
}

export const airportInitialState: AirportState = {
  selectedAirport: undefined,
};
