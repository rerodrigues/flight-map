import { RequestData, requestPristine } from '../../../util';
import { Airport } from '../../../services/airports';

export interface AirportsState {
  airportsData: RequestData<Airport[]>;
  filteredAirportData: Airport[];
}

export const airportsInitialState: AirportsState = {
  airportsData: requestPristine(),
  filteredAirportData: [],
};
