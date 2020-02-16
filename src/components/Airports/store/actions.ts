import { ActionTypes } from './actionTypes';
import { Airport } from '../../../services/airports/types';
import { LoadAirportsSuccess, LoadAirportsFetch, LoadAirportsError, LoadAirportsParams } from './types';

export const loadAirportsFetch = (params: LoadAirportsParams = {}): LoadAirportsFetch => ({
  type: ActionTypes.LOAD_AIRPORTS_FETCH,
  payload: params,
});

export const loadAirportsSuccess = (data: Airport[]): LoadAirportsSuccess => ({
  type: ActionTypes.LOAD_AIRPORTS_SUCCESS,
  payload: data,
});

export const loadAirportsError = (message?: string, code?: number): LoadAirportsError => ({
  type: ActionTypes.LOAD_AIRPORTS_ERROR,
  payload: {
    message,
    code,
  },
});
