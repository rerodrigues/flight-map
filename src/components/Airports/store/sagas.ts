import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { airportsService } from '../../../services';

import { loadAirportsSuccess, loadAirportsError } from './actions';
import { ActionTypes } from './actionTypes';
import { LoadAirportsFetch } from './types';
import { selectFlighsData, loadFlightsFetch } from '../../Flights/store';
import { isRequestSuccess } from '../../../util';

export function* loadAirportsSaga(action: LoadAirportsFetch): SagaIterator {
  try {
    let airports;

    if (action.payload && action.payload.countryId) {
      airports = yield call(airportsService.getAirportsByCountry, action.payload.countryId);
    } else {
      airports = yield call(airportsService.getAirports);
    }

    const flights = yield select(selectFlighsData);
    if (!isRequestSuccess(flights)) {
      yield put(loadFlightsFetch());
    }

    yield put(loadAirportsSuccess(airports));
  } catch (error) {
    console.log(error);
    yield put(loadAirportsError(error.mesage, error.statusCode));
  }
}

export function* AirportsSagas(): SagaIterator {
  yield all([takeLatest(ActionTypes.LOAD_AIRPORTS_FETCH, loadAirportsSaga)]);
}
