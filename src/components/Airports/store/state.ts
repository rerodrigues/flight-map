import { RequestData, requestPristine } from '../../../util';
import { Airport } from '../../../services/airports';

export interface AirportsState {
  airportsData: RequestData<Airport[]>;
}

export const airportsInitialState: AirportsState = {
  airportsData: requestPristine(),
};
