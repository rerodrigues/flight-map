import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { airportsService } from '../../../services';

import {
  loadAirportsSuccess,
  loadAirportsError,
  filterAirportsSuccess,
  loadAirportsFetch,
  filterAirportsError,
} from './actions';
import { ActionTypes } from './actionTypes';
import { FilterAirportsStart } from './types';
import { selectFlightsData, loadFlightsFetch } from '../../Flights/store';
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
    const airportsData = yield select(selectAirportsData);
    if (!isRequestSuccess(airportsData)) {
      yield put(loadAirportsFetch());
    }

    let airports = yield select(selectAirportsData);

    if (action.payload && action.payload.countryId) {
      airports = yield call(airportsService.filterAirportsByCountry, airports.data, action.payload.countryId);
      yield put(filterAirportsSuccess(airports));
    } else {
      yield put(filterAirportsSuccess(airports.data));
    }
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
