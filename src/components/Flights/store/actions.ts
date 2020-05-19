import { ActionTypes } from './actionTypes';
import { Flight } from '../../../services/flights/types';
import { LoadFlightsSuccess, LoadFlightsFetch, LoadFlightsError, LoadFlightsParams } from './types';

export const loadFlightsFetch = (params: LoadFlightsParams = {}): LoadFlightsFetch => ({
  type: ActionTypes.LOAD_FLIGHTS_FETCH,
  payload: params,
});

export const loadFlightsSuccess = (data: Flight[]): LoadFlightsSuccess => ({
  type: ActionTypes.LOAD_FLIGHTS_SUCCESS,
  payload: data,
});

export const loadFlightsError = (message?: string, code?: number): LoadFlightsError => ({
  type: ActionTypes.LOAD_FLIGHTS_ERROR,
  payload: {
    message,
    code,
  },
});
