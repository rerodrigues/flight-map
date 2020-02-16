/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import { useDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import { loadAirportsFetch } from './actions';
import { Airport } from '../../services/airports';
import { AppState, history } from '../../store';
import { isRequestSuccess, RequestData } from '../../util';
import { LoadAirportsParams } from './types';

const renderAirports = (airports: RequestData<Airport[]>): JSX.Element => (
  <ul>
    {isRequestSuccess(airports) &&
      airports.data
        .sort((a: Airport, b: Airport) => {
          if (a.country > b.country) {
            return 1;
          }
          if (a.country < b.country) {
            return -1;
          }
          return 0;
        })
        .map((airport: Airport) => (
          <li key={airport.icao}>
            <Link to={`/airports/country/${airport.country}`}>{airport.country}</Link> -{' '}
            <Link to={`/flights/airport/${airport.icao}`}>{airport.icao}</Link>
          </li>
        ))}
  </ul>
);

interface AirportsParams {
  params: LoadAirportsParams;
}

export const Airports: React.FC = () => {
  const dispatch = useDispatch();
  const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
  const { params }: AirportsParams = useRouteMatch();

  useEffect(() => {
    try {
      if (params.countryId) {
        dispatch(loadAirportsFetch({ countryId: params.countryId }));
      } else {
        dispatch(loadAirportsFetch());
      }
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, params.countryId]);

  const airports = useSelector(state => state.airports.airportsData);

  return (
    <>
      <button type="button" onClick={history.goBack}>
        &lt; Back
      </button>
      {params.countryId && <h1>Airports in {params.countryId.toUpperCase()}</h1>}
      {!params.countryId && <h1>All Airports</h1>}
      {isRequestSuccess(airports) && renderAirports(airports)}
    </>
  );
};
