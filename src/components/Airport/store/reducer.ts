import { ActionTypes } from './actionTypes';
import { AirportAction } from './types';
import { AirportState, airportInitialState } from './state';

const airportReducer = (state: AirportState = airportInitialState, action: AirportAction): AirportState => {
  const hasAction = (actionType: string): actionType is keyof typeof ActionTypes => actionType.length > 0;

  if (!hasAction(action.type)) {
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
        selectedAirport: null,
      };
    default:
      return state;
  }
};

export default airportReducer;
