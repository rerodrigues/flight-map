import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { flightsService } from '../../../services';

import { findFlightSuccess, findFlightError } from './actions';
import { ActionTypes } from './actionTypes';
import { FindFlight } from './types';
import { isRequestSuccess } from '../../../util';
import { loadFlightsFetch, selectFlightsData } from '../../Flights/store';

export function* findFlightSaga(action: FindFlight): SagaIterator {
  try {
    const flightsData = yield select(selectFlightsData);
    if (!isRequestSuccess(flightsData)) {
      yield put(loadFlightsFetch());
    }

    const flights = yield select(selectFlightsData);
    const flight = yield call(flightsService.findFlightById, flights.data, action.payload.id);
    yield put(findFlightSuccess(flight));
  } catch (error) {
    console.log(error);
    yield put(findFlightError(error.mesage, error.statusCode));
  }
}

export function* FlightSagas(): SagaIterator {
  yield all([takeLatest(ActionTypes.FIND_FLIGHT, findFlightSaga)]);
}
