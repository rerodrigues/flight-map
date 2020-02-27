import { Airport } from '../../../services/airports';

export interface AirportState {
  selectedAirport: Airport | null;
}

export const airportInitialState: AirportState = {
  selectedAirport: null,
};
