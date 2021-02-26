import { ActionTypes } from './actionTypes';
import { FlightAction } from './types';
import { FlightState, flightInitialState } from './state';
import { hasValue } from '../../../util';

const flightReducer = (state: FlightState = flightInitialState, action: FlightAction): FlightState => {
  if (!hasValue(ActionTypes, action.type)) {
    return state;
  }

  switch (action.type) {
    case ActionTypes.FIND_FLIGHT_SUCCESS:
      return {
        ...state,
        selectedFlight: action.payload,
      };
    case ActionTypes.FIND_FLIGHT_ERROR:
      return {
        ...state,
        selectedFlight: undefined,
      };
    default:
      return state;
  }
};

export default flightReducer;
