import { ActionTypes } from './actionTypes';
import { Airport } from '../../services/airports';
import { AirportsAction } from './types';
import { RequestData, requestPristine, requestFetching, requestSuccess, requestError } from '../../util';

export interface AirportsState {
  airportsData: RequestData<Airport[]>;
}

const airportsInitialState: AirportsState = {
  airportsData: requestPristine(),
};

export const airportsReducer = (state: AirportsState = airportsInitialState, action: AirportsAction): AirportsState => {
  // if (!(action.type in ActionTypes)) {
  //   return state;
  // }

  switch (action.type) {
    case ActionTypes.LOAD_AIRPORTS_FETCH:
      return {
        ...state,
        airportsData: requestFetching(),
      };
    case ActionTypes.LOAD_AIRPORTS_SUCCESS:
      return {
        ...state,
        airportsData: requestSuccess(action.payload),
      };
    case ActionTypes.LOAD_AIRPORTS_ERROR: {
      const { message, code } = action.payload;
      return {
        ...state,
        airportsData: requestError(message, code),
      };
    }
    default:
      return state;
  }
};
