import { ActionTypes } from './actionTypes';
import { Airport } from '../../../services/airports/types';
import { AirportParams, FindAirport, FindAirportSuccess, FindAirportError } from './types';

export const findAirport = (params: AirportParams): FindAirport => ({
  type: ActionTypes.FIND_AIRPORT,
  payload: params,
});

export const findAirportSuccess = (data: Airport): FindAirportSuccess => ({
  type: ActionTypes.FIND_AIRPORT_SUCCESS,
  payload: data,
});

export const findAirportError = (message?: string, code?: number): FindAirportError => ({
  type: ActionTypes.FIND_AIRPORT_ERROR,
  payload: {
    message,
    code,
  },
});
