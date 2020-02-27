import { ActionTypes } from './actionTypes';
import { Airport } from '../../../services/airports/types';
import {
  LoadAirportsSuccess,
  LoadAirportsFetch,
  LoadAirportsError,
  AirportsParams,
  FilterAirportsStart,
  FilterAirportsSuccess,
  FilterAirportsError,
} from './types';

export const loadAirportsFetch = (params: AirportsParams = {}): LoadAirportsFetch => ({
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

export const filterAirportsStart = (params: AirportsParams = {}): FilterAirportsStart => ({
  type: ActionTypes.FILTER_AIRPORTS_START,
  payload: params,
});

export const filterAirportsSuccess = (data: Airport[]): FilterAirportsSuccess => ({
  type: ActionTypes.FILTER_AIRPORTS_SUCCESS,
  payload: data,
});

export const filterAirportsError = (message?: string, code?: number): FilterAirportsError => ({
  type: ActionTypes.FILTER_AIRPORTS_ERROR,
  payload: {
    message,
    code,
  },
});
