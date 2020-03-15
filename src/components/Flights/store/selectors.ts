import { compose } from 'redux';

import { AppState } from '../../../store';
import { FlightsState } from './state';

export const selectFlights = (state: AppState): FlightsState => state.flights;

export const selectFlightsData = compose(state => state.flightsData, selectFlights);

export const selectFilteredFlightsData = compose(state => state.filteredFlightsData, selectFlights);
