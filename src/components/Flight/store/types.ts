import { ActionTypes } from './actionTypes';
import { Flight } from '../../../services/flights/types';
import { RequestError } from '../../../util';

export interface FindFlight {
  type: typeof ActionTypes.FIND_FLIGHT;
  payload: FlightParams;
}
export interface FindFlightSuccess {
  type: typeof ActionTypes.FIND_FLIGHT_SUCCESS;
  payload: Flight;
}
export interface FindFlightError {
  type: typeof ActionTypes.FIND_FLIGHT_ERROR;
  payload: RequestError;
}

export interface FlightParams {
  icao: string;
}

export type FlightAction = FindFlight | FindFlightSuccess | FindFlightError;
