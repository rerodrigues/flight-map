import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  filterAirportsError,
  filterAirportsSuccess,
  loadAirportsError,
  loadAirportsFetch,
  loadAirportsSuccess,
} from './actions';

import { ActionTypes } from './actionTypes';
import { FilterAirportsStart } from './types';
import { airportsService } from '../../../services';
import { isRequestSuccess } from '../../../util';
import { selectAirportsData } from './selectors';

export function* loadAirportsSaga(): SagaIterator {
  try {
    const airports = yield call(airportsService.getAirports);
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
