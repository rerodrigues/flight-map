import { ActionTypes } from './actionTypes';
import { AirportAction } from './types';
import { AirportState, airportInitialState } from './state';

const airportReducer = (state: AirportState = airportInitialState, action: AirportAction): AirportState => {
  // if (!(action.type in ActionTypes)) {
  //   return state;
  // }

  switch (action.type) {
    case ActionTypes.FIND_AIRPORT_SUCCESS:
      return {
        ...state,
        selectedAirport: action.payload,
      };
    case ActionTypes.FIND_AIRPORT_ERROR:
      return {
        ...state,
        selectedAirport: null,
      };
    default:
      return state;
  }
};

export default airportReducer;
