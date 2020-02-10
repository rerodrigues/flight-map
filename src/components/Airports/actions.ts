import { ActionTypes } from './actionTypes';
import { Airport } from '../../services/airports';
import { LoadAirportsSuccess, LoadAirportsFetch, LoadAirportsError } from './types';

export const loadAirportsFetch = (): LoadAirportsFetch => ({
  type: ActionTypes.LOAD_AIRPORTS_FETCH,
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
