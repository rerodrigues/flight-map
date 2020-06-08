import airportsReducer from '../components/Airports/store';
import flightsReducer from '../components/Flights/store';
import airportReducer from '../components/Airport/store';

const reducers = {
  airports: airportsReducer,
  flights: flightsReducer,
  airport: airportReducer,
};

export default reducers;
