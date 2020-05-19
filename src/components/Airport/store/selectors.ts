/* eslint-disable import/no-cycle */
import { compose } from 'redux';
import { AppState } from '../../../store';
import { AirportState } from './state';

export const selectAirport = (state: AppState): AirportState => state.airport;

export const selectSelectedAirport = compose(state => state.selectedAirport, selectAirport);
