import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { useSelector, isRequestSuccess } from './util';
import { loadFlightsFetch } from './components/Flights/store';
import { loadAirportsFetch } from './components/Airports/store';
import { Loading, Routes } from './components';

import { history } from './store';

import './App.css';

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
