/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { loadAirportsFetch } from './actions';
import { Airport } from '../../services/airports';
import { AppState } from '../../store';
import { isRequestSuccess } from '../../util';

export const Airports: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(loadAirportsFetch());
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  const useSelectorr: TypedUseSelectorHook<AppState> = useSelector;
  const airports = useSelectorr(state => state.airports.airportsData);

  return (
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
          .map((ap: Airport) => (
            <li key={ap.icao}>
              {ap.country} - {ap.icao}
            </li>
          ))}
    </ul>
  );
};
