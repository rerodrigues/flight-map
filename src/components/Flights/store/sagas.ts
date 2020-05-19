import { call, put, takeLatest, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { flightsService } from '../../../services';

import { loadFlightsSuccess, loadFlightsError } from './actions';
import { ActionTypes } from './actionTypes';
import { LoadFlightsFetch } from './types';

export function* loadFlightsSaga(action: LoadFlightsFetch): SagaIterator {
  try {
    let fligths;

    if (action.payload && action.payload.companyCode) {
      fligths = yield call(flightsService.getFlightsByCompanyCode, action.payload.companyCode);
    } else if (action.payload && action.payload.icaoCode) {
      fligths = yield call(flightsService.getFlightsByIcaoCode, action.payload.icaoCode);
    } else {
      fligths = yield call(flightsService.getFlights);
    }

    yield put(loadFlightsSuccess(fligths));
  } catch (error) {
    console.log(error);
    yield put(loadFlightsError(error.mesage, error.statusCode));
  }
}

export function* FlightsSagas(): SagaIterator {
  yield all([takeLatest(ActionTypes.LOAD_FLIGHTS_FETCH, loadFlightsSaga)]);
}
