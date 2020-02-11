import { airportsReducer } from '../components/Airports/reducer';
import { flightsReducer } from '../components/Flights/reducer';

const reducers = {
  airports: airportsReducer,
  flights: flightsReducer,
};

export default reducers;
