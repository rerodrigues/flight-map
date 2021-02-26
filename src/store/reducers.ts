import airportsReducer from '../components/Airports/store';
import flightsReducer from '../components/Flights/store';
import airportReducer from '../components/Airport/store';
import flightReducer from '../components/Flight/store';

const reducers = {
  airports: airportsReducer,
  flights: flightsReducer,
  airport: airportReducer,
  flight: flightReducer,
};

export default reducers;
