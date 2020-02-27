import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { airportsService } from '../../../services';

import { findAirportSuccess, findAirportError } from './actions';
import { ActionTypes } from './actionTypes';
import { FindAirport } from './types';
import { isRequestSuccess } from '../../../util';
import { loadAirportsFetch, selectAirportsData } from '../../Airports/store';

export function* findAirportSaga(action: FindAirport): SagaIterator {
  try {
    const airportsData = yield select(selectAirportsData);
    if (!isRequestSuccess(airportsData)) {
      yield put(loadAirportsFetch());
    }

    const airports = yield select(selectAirportsData);

    const airport = yield call(airportsService.findAirportByIcao, airports.data, action.payload.icao);
    yield put(findAirportSuccess(airport));
  } catch (error) {
    console.log(error);
    yield put(findAirportError(error.mesage, error.statusCode));
  }
}

export function* AirportSagas(): SagaIterator {
  yield all([takeLatest(ActionTypes.FIND_AIRPORT, findAirportSaga)]);
}
