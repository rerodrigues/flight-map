import { ActionTypes } from './actionTypes';
import { Flight } from '../../../services/flights/types';
import { RequestError } from '../../../util';

export interface LoadFlightsFetch {
  type: typeof ActionTypes.LOAD_FLIGHTS_FETCH;
}

export interface LoadFlightsSuccess {
  type: typeof ActionTypes.LOAD_FLIGHTS_SUCCESS;
  payload: Flight[];
}

export interface LoadFlightsError {
  type: typeof ActionTypes.LOAD_FLIGHTS_ERROR;
  payload: RequestError;
}

export interface FilterFlightsStart {
  type: typeof ActionTypes.FILTER_FLIGHTS_START;
  payload: FlightsParams;
}
export interface FilterFlightsSuccess {
  type: typeof ActionTypes.FILTER_FLIGHTS_SUCCESS;
  payload: Flight[];
}
export interface FilterFlightsError {
  type: typeof ActionTypes.FILTER_FLIGHTS_ERROR;
  payload: RequestError;
}

export interface FlightsParams {
  companyCode?: string;
  icaoCode?: string;
}

export type FlightsAction =
  | LoadFlightsFetch
  | LoadFlightsSuccess
  | LoadFlightsError
  | FilterFlightsStart
  | FilterFlightsSuccess
  | FilterFlightsError;
