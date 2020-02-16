/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import { useDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import { loadFlightsFetch, LoadFlightsParams } from './store';
import { Flight } from '../../services/flights/types';
import { AppState, history } from '../../store';
import { isRequestSuccess, RequestData } from '../../util';

const renderFlights = (flights: RequestData<Flight[]>): JSX.Element => (
  <ul>
    {isRequestSuccess(flights) &&
      flights.data
        .sort((a: Flight, b: Flight) => {
          if (a.companyCode > b.companyCode) {
            return 1;
          }
          if (a.companyCode < b.companyCode) {
            return -1;
          }
          return 0;
        })
        .map((flight: Flight) => (
          <li key={flight.id}>
            <Link to={`/flights/airport/${flight.departure.airportCode}`}>{flight.departure.airportCode}</Link>
            --&gt;
            <Link to={`/flights/airport/${flight.arrival.airportCode}`}>{flight.arrival.airportCode}</Link>:{' '}
            {flight.companyCode.toUpperCase()}
            {flight.number} - <Link to={`/flights/company/${flight.companyCode}`}>{flight.company}</Link>
          </li>
        ))}
  </ul>
);

interface FlightsParams {
  params: LoadFlightsParams;
}

export const Flights: React.FC = () => {
  const dispatch = useDispatch();
  const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
  const { params }: FlightsParams = useRouteMatch();

  useEffect(() => {
    try {
      if (params.companyCode) {
        dispatch(loadFlightsFetch({ companyCode: params.companyCode }));
      } else if (params.icaoCode) {
        dispatch(loadFlightsFetch({ icaoCode: params.icaoCode }));
      } else {
        dispatch(loadFlightsFetch());
      }
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, params.companyCode, params.icaoCode]);

  const flights = useSelector(state => state.flights.flightsData);

  return (
    <>
      <button type="button" onClick={history.goBack}>
        &lt; Back
      </button>
      {params.companyCode && <h1>Flights of Company {params.companyCode.toUpperCase()}</h1>}
      {params.icaoCode && <h1>Flights of Airport {params.icaoCode.toUpperCase()}</h1>}
      {!params.companyCode && !params.icaoCode && <h1>All Flights</h1>}
      {isRequestSuccess(flights) && renderFlights(flights)}
    </>
  );
};
