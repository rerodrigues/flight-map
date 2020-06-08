import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from './actionTypes';
import { FilterFlightsStart } from './types';
import {
  filterFlightsError,
  filterFlightsSuccess,
  loadFlightsError,
  loadFlightsFetch,
  loadFlightsSuccess,
} from './actions';
import { flightsService } from '../../../services';
import { isRequestSuccess } from '../../../util';
import { selectFlightsData } from './selectors';

export function* loadFlightsSaga(): SagaIterator {
  try {
    const flights = yield call(flightsService.getFlights);
    yield put(loadFlightsSuccess(flights));
  } catch (error) {
    console.log(error);
    yield put(loadFlightsError(error.mesage, error.statusCode));
  }
}

export function* filterFlightsSaga(action: FilterFlightsStart): SagaIterator {
  try {
    let flightsData = yield select(selectFlightsData);
    if (!isRequestSuccess(flightsData)) {
      yield put(loadFlightsFetch());
      flightsData = yield select(selectFlightsData);
    }

    let flights = flightsData.data;

    if (action.payload && action.payload.companyCode) {
      flights = yield call(flightsService.filterFlightsByCompanyCode, flights, action.payload.companyCode);
    } else if (action.payload && action.payload.icaoCode) {
      flights = yield call(flightsService.filterFlightsByIcao, flights, action.payload.icaoCode);
    }

    yield put(filterFlightsSuccess(flights));
  } catch (error) {
    console.log(error);
    yield put(filterFlightsError(error.mesage, error.statusCode));
  }
}

export function* FlightsSagas(): SagaIterator {
  yield all([
    takeLatest(ActionTypes.LOAD_FLIGHTS_FETCH, loadFlightsSaga),
    takeLatest(ActionTypes.FILTER_FLIGHTS_START, filterFlightsSaga),
  ]);
}
