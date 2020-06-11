import { ActionTypes } from './actionTypes';
import { AirportAction } from './types';
import { AirportState, airportInitialState } from './state';
import { hasValue } from '../../../util';

const airportReducer = (state: AirportState = airportInitialState, action: AirportAction): AirportState => {
  if (!hasValue(ActionTypes, action.type)) {
    return state;
  }

  switch (action.type) {
    case ActionTypes.FIND_AIRPORT_SUCCESS:
      return {
        ...state,
        selectedAirport: action.payload,
      };
    case ActionTypes.FIND_AIRPORT_ERROR:
      return {
        ...state,
        selectedAirport: undefined,
      };
    default:
      return state;
  }
};

export default airportReducer;
