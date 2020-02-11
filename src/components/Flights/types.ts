import { ActionTypes } from './actionTypes';
import { Flight } from '../../services/flights/types';
import { RequestError } from '../../util';

export interface LoadFlightsFetch {
  type: typeof ActionTypes.LOAD_FLIGHTS_FETCH;
  payload: LoadFlightsParams;
}

export interface LoadFlightsSuccess {
  type: typeof ActionTypes.LOAD_FLIGHTS_SUCCESS;
  payload: Flight[];
}

export interface LoadFlightsError {
  type: typeof ActionTypes.LOAD_FLIGHTS_ERROR;
  payload: RequestError;
}

export interface LoadFlightsParams {
  companyCode?: string;
}

export type FlightsAction = LoadFlightsFetch | LoadFlightsSuccess | LoadFlightsError;
