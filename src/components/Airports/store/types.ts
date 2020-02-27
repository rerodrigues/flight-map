import { ActionTypes } from './actionTypes';
import { Airport } from '../../../services/airports/types';
import { RequestError } from '../../../util';

export interface LoadAirportsFetch {
  type: typeof ActionTypes.LOAD_AIRPORTS_FETCH;
  payload: AirportsParams;
}

export interface LoadAirportsSuccess {
  type: typeof ActionTypes.LOAD_AIRPORTS_SUCCESS;
  payload: Airport[];
}

export interface LoadAirportsError {
  type: typeof ActionTypes.LOAD_AIRPORTS_ERROR;
  payload: RequestError;
}

export interface FilterAirportsStart {
  type: typeof ActionTypes.FILTER_AIRPORTS_START;
  payload: AirportsParams;
}
export interface FilterAirportsSuccess {
  type: typeof ActionTypes.FILTER_AIRPORTS_SUCCESS;
  payload: Airport[];
}
export interface FilterAirportsError {
  type: typeof ActionTypes.FILTER_AIRPORTS_ERROR;
  payload: RequestError;
}

export interface AirportsParams {
  countryId?: string;
}

export type AirportsAction =
  | LoadAirportsFetch
  | LoadAirportsSuccess
  | LoadAirportsError
  | FilterAirportsStart
  | FilterAirportsSuccess
  | FilterAirportsError;
