/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import { useDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import BaseMap from '../BaseMap/Map';
import { filterAirportsStart, AirportsParams } from './store';
import { AppState } from '../../store';
import { isRequestSuccess } from '../../util';
import { Airport } from '../../services/airports/types';
import { TitleControl } from '../BaseMap';
import { AirportMarker, FlightRoutes } from './components';

interface LoadAirportsParams {
  params: AirportsParams;
}

export const Airports: React.FC = () => {
  const dispatch = useDispatch();
  const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
  const { params }: LoadAirportsParams = useRouteMatch();

  useEffect(() => {
    try {
      if (params.countryId) {
        dispatch(filterAirportsStart({ countryId: params.countryId }));
      } else {
        dispatch(filterAirportsStart());
      }
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, params.countryId]);

  const airports = useSelector(state => state.airports.filteredAirportData);
  const flights = useSelector(state => state.flights.flightsData);

  return (
    <BaseMap>
      {params.countryId && <TitleControl title={`Airports in ${params.countryId.toUpperCase()}`} />}
      {!params.countryId && <TitleControl title="All Airports" />}

      {airports.map((airport: Airport) => (
        <AirportMarker airport={airport} key={airport.icao} />
      ))}

      {isRequestSuccess(flights) && <FlightRoutes airports={airports} flights={flights.data} />}
    </BaseMap>
  );
};
