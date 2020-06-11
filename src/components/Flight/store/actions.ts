import { ActionTypes } from './actionTypes';
import { Flight } from '../../../services/flights/types';
import { FlightParams, FindFlight, FindFlightSuccess, FindFlightError } from './types';

export const findFlight = (params: FlightParams): FindFlight => ({
  type: ActionTypes.FIND_FLIGHT,
  payload: params,
});

export const findFlightSuccess = (data: Flight): FindFlightSuccess => ({
  type: ActionTypes.FIND_FLIGHT_SUCCESS,
  payload: data,
});

export const findFlightError = (message?: string, code?: number): FindFlightError => ({
  type: ActionTypes.FIND_FLIGHT_ERROR,
  payload: {
    message,
    code,
  },
});
