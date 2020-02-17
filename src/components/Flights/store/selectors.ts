/* eslint-disable import/no-cycle */
import { compose } from 'redux';
import { AppState } from '../../../store';
import { FlightsState } from './state';

export const selectFlights = (state: AppState): FlightsState => state.flights;

export const selectFlighsData = compose(state => state.flightsData, selectFlights);
