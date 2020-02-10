import { call, put, takeLatest, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { airportsService } from '../../services';

import { loadAirportsSuccess, loadAirportsError } from './actions';
import { ActionTypes } from './actionTypes';

export function* loadAirportsSaga(): SagaIterator {
  try {
    const airports = yield call(airportsService.getAirports);
    yield put(loadAirportsSuccess(airports));
  } catch (error) {
    console.log(error);
    yield put(loadAirportsError(error.mesage, error.statusCode));
  }
}

export function* AirportsSagas(): SagaIterator {
  yield all([takeLatest(ActionTypes.LOAD_AIRPORTS_FETCH, loadAirportsSaga)]);
}
