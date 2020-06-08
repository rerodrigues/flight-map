import { compose } from 'redux';

import { AirportsState } from './state';
import { AppState } from '../../../store';

export const selectAirports = (state: AppState): AirportsState => state.airports;

export const selectAirportsData = compose(state => state.airportsData, selectAirports);

export const selectFilteredAirportData = compose(state => state.filteredAirportData, selectAirports);
