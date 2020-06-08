import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Flight } from '../../services/flights/types';
import { FlightsParams, filterFlightsStart, selectFilteredFlightsData } from './store';
import { history } from '../../store';
import { useSelector } from '../../util';

const renderFlights = (flights: Flight[]): JSX.Element => (
  <ul>
    {flights.length > 0 &&
      flights
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

interface LoadFlightsParams {
  params: FlightsParams;
}

export const Flights: React.FC = () => {
  const dispatch = useDispatch();
  const { params }: LoadFlightsParams = useRouteMatch();

  useEffect(() => {
    dispatch(filterFlightsStart({ companyCode: params.companyCode, icaoCode: params.icaoCode }));
  }, [dispatch, params.companyCode, params.icaoCode]);

  const flights = useSelector(selectFilteredFlightsData);

  return (
    <>
      <button type="button" onClick={history.goBack}>
        &lt; Back
      </button>
      {params.companyCode && <h1>Flights of Company {params.companyCode.toUpperCase()}</h1>}
      {params.icaoCode && <h1>Flights of Airport {params.icaoCode.toUpperCase()}</h1>}
      {!params.companyCode && !params.icaoCode && <h1>All Flights</h1>}
      {renderFlights(flights)}
    </>
  );
};

export default Flights;
