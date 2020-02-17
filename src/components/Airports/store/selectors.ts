/* eslint-disable import/no-cycle */
import { compose } from 'redux';
import { AppState } from '../../../store';
import { AirportsState } from './state';

export const selectAirports = (state: AppState): AirportsState => state.airports;

export const selectAirportsData = compose(state => state.airportsData, selectAirports);
