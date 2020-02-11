import { call, put, takeLatest, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { airportsService } from '../../services';

import { loadAirportsSuccess, loadAirportsError } from './actions';
import { ActionTypes } from './actionTypes';
import { LoadAirportsFetch } from './types';

export function* loadAirportsSaga(action: LoadAirportsFetch): SagaIterator {
  try {
    let airports;

    if (action.payload && action.payload.countryId) {
      airports = yield call(airportsService.getAirportsByCountry, action.payload.countryId);
    } else {
      airports = yield call(airportsService.getAirports);
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
