import { ActionTypes } from './actionTypes';
import { FlightsAction } from './types';
import { FlightsState, flightsInitialState } from './state';
import { requestError, requestFetching, requestSuccess } from '../../../util';

const flightsReducer = (state: FlightsState = flightsInitialState, action: FlightsAction): FlightsState => {
  // if (!(action.type in ActionTypes)) {
  //   return state;
  // }

  switch (action.type) {
    case ActionTypes.LOAD_FLIGHTS_FETCH:
      return {
        ...state,
        flightsData: requestFetching(),
      };
    case ActionTypes.LOAD_FLIGHTS_SUCCESS:
      return {
        ...state,
        flightsData: requestSuccess(action.payload),
      };
    case ActionTypes.LOAD_FLIGHTS_ERROR: {
      const { message, code } = action.payload;
      return {
        ...state,
        flightsData: requestError(message, code),
      };
    }
    case ActionTypes.FILTER_FLIGHTS_START:
    case ActionTypes.FILTER_FLIGHTS_ERROR:
      return {
        ...state,
        filteredFlightsData: [],
      };
    case ActionTypes.FILTER_FLIGHTS_SUCCESS:
      return {
        ...state,
        filteredFlightsData: action.payload,
      };
    default:
      return state;
  }
};

export default flightsReducer;
