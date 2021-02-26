/* eslint-disable import/no-cycle */
import { compose } from 'redux';
import { AppState } from '../../../store';
import { FlightState } from './state';

export const selectFlight = (state: AppState): FlightState => state.flight;

export const selectSelectedFlight = compose(state => state.selectedFlight, selectFlight);
