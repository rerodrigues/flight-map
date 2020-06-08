import { ActionTypes } from './actionTypes';
import {
  FilterFlightsError,
  FilterFlightsStart,
  FilterFlightsSuccess,
  FlightsParams,
  LoadFlightsError,
  LoadFlightsFetch,
  LoadFlightsSuccess,
} from './types';
import { Flight } from '../../../services/flights/types';

export const loadFlightsFetch = (): LoadFlightsFetch => ({
  type: ActionTypes.LOAD_FLIGHTS_FETCH,
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

export const filterFlightsStart = (params: FlightsParams = {}): FilterFlightsStart => ({
  type: ActionTypes.FILTER_FLIGHTS_START,
  payload: params,
});

export const filterFlightsSuccess = (data: Flight[]): FilterFlightsSuccess => ({
  type: ActionTypes.FILTER_FLIGHTS_SUCCESS,
  payload: data,
});

export const filterFlightsError = (message?: string, code?: number): FilterFlightsError => ({
  type: ActionTypes.FILTER_FLIGHTS_ERROR,
  payload: {
    message,
    code,
  },
});
