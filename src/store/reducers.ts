import airportsReducer from '../components/Airports/store';
import flightsReducer from '../components/Flights/store';
import loadAirportsFetch from '../components/Airport/store';

const reducers = {
  airports: airportsReducer,
  flights: flightsReducer,
  airport: loadAirportsFetch,
};

export default reducers;
