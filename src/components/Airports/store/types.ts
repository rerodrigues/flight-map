import { ActionTypes } from './actionTypes';
import { Airport } from '../../../services/airports/types';
import { RequestError } from '../../../util';

export interface LoadAirportsFetch {
  type: typeof ActionTypes.LOAD_AIRPORTS_FETCH;
  payload: LoadAirportsParams;
}

export interface LoadAirportsSuccess {
  type: typeof ActionTypes.LOAD_AIRPORTS_SUCCESS;
  payload: Airport[];
}

export interface LoadAirportsError {
  type: typeof ActionTypes.LOAD_AIRPORTS_ERROR;
  payload: RequestError;
}

export interface LoadAirportsParams {
  countryId?: string;
}

export type AirportsAction = LoadAirportsFetch | LoadAirportsSuccess | LoadAirportsError;