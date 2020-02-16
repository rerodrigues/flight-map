import { RequestData, requestPristine } from '../../../util';
import { Flight } from '../../../services/flights';

export interface FlightsState {
  flightsData: RequestData<Flight[]>;
}

export const flightsInitialState: FlightsState = {
  flightsData: requestPristine(),
};
