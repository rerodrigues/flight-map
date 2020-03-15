import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  filterAirportsError,
  filterAirportsSuccess,
  loadAirportsError,
  loadAirportsFetch,
  loadAirportsSuccess,
} from './actions';
import { loadFlightsFetch, selectFlightsData } from '../../Flights/store';

import { ActionTypes } from './actionTypes';
import { FilterAirportsStart } from './types';
import { SagaIterator } from 'redux-saga';
import { airportsService } from '../../../services';
import { isRequestSuccess } from '../../../util';
import { selectAirportsData } from './selectors';

export function* loadAirportsSaga(): SagaIterator {
  try {
    const airports = yield call(airportsService.getAirports);
    const flights = yield select(selectFlightsData);

    if (!isRequestSuccess(flights)) {
      yield put(loadFlightsFetch());
    }

    yield put(loadAirportsSuccess(airports));
  } catch (error) {
    console.log(error);
    yield put(loadAirportsError(error.mesage, error.statusCode));
  }
}

export function* filterAirportsSaga(action: FilterAirportsStart): SagaIterator {
  try {
    let airportsData = yield select(selectAirportsData);
    if (!isRequestSuccess(airportsData)) {
      yield put(loadAirportsFetch());
      airportsData = yield select(selectAirportsData);
    }

    let airports = airportsData.data;

    if (action.payload && action.payload.countryId) {
      airports = yield call(airportsService.filterAirportsByCountry, airports, action.payload.countryId);
    }

    yield put(filterAirportsSuccess(airports));
  } catch (error) {
    console.log(error);
    yield put(filterAirportsError(error.mesage, error.statusCode));
  }
}

export function* AirportsSagas(): SagaIterator {
  yield all([
    takeLatest(ActionTypes.LOAD_AIRPORTS_FETCH, loadAirportsSaga),
    takeLatest(ActionTypes.FILTER_AIRPORTS_START, filterAirportsSaga),
  ]);
}
