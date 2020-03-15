import { Flight } from '../../../services/flights';
import { RequestData, requestPristine } from '../../../util';

export interface FlightsState {
  flightsData: RequestData<Flight[]>;
  filteredFlightsData: Flight[];
}

export const flightsInitialState: FlightsState = {
  flightsData: requestPristine(),
  filteredFlightsData: [],
};
