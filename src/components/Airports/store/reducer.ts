import { ActionTypes } from './actionTypes';
import { AirportsAction } from './types';
import { AirportsState, airportsInitialState } from './state';
import { requestError, requestFetching, requestSuccess } from '../../../util';

const airportsReducer = (state: AirportsState = airportsInitialState, action: AirportsAction): AirportsState => {
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
    case ActionTypes.FILTER_AIRPORTS_START:
    case ActionTypes.FILTER_AIRPORTS_ERROR:
      return {
        ...state,
        filteredAirportData: [],
      };
    case ActionTypes.FILTER_AIRPORTS_SUCCESS:
      return {
        ...state,
        filteredAirportData: action.payload,
      };
    default:
      return state;
  }
};

export default airportsReducer;
