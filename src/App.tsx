import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { useSelector, isRequestSuccess } from './util';
import { loadFlightsFetch } from './components/Flights';
import { loadAirportsFetch } from './components/Airports';
import { Loading, Routes } from './components/Home';

import { history } from './store';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAirportsFetch());
    dispatch(loadFlightsFetch());
  }, [dispatch]);

  const airportsData = useSelector(state => state.airports.airportsData);
  const flightsData = useSelector(state => state.flights.flightsData);
  const isDataLoading = !isRequestSuccess(airportsData) || !isRequestSuccess(flightsData);

  return (
    <ConnectedRouter history={history}>
      {isDataLoading && <Loading />}
      {!isDataLoading && <Routes />}
    </ConnectedRouter>
  );
};

export default App;
