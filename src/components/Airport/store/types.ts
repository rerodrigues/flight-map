import { ActionTypes } from './actionTypes';
import { Airport } from '../../../services/airports/types';
import { RequestError } from '../../../util';

export interface FindAirport {
  type: typeof ActionTypes.FIND_AIRPORT;
  payload: AirportParams;
}
export interface FindAirportSuccess {
  type: typeof ActionTypes.FIND_AIRPORT_SUCCESS;
  payload: Airport;
}
export interface FindAirportError {
  type: typeof ActionTypes.FIND_AIRPORT_ERROR;
  payload: RequestError;
}

export interface AirportParams {
  icao: string;
}

export type AirportAction = FindAirport | FindAirportSuccess | FindAirportError;
