/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import { useDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import BaseMap from '../BaseMap/Map';
import { loadAirportsFetch, LoadAirportsParams } from './store';
import { AppState } from '../../store';
import { isRequestSuccess } from '../../util';
import { Airport } from '../../services/airports/types';
import { TitleControl } from '../BaseMap';
import { AirportMarker } from './components';

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
    <BaseMap>
      {params.countryId && <TitleControl title={`Airports in ${params.countryId.toUpperCase()}`} />}
      {!params.countryId && <TitleControl title="All Airports" />}

      {isRequestSuccess(airports) &&
        airports.data.map((airport: Airport) => <AirportMarker airport={airport} key={airport.icao} />)}
    </BaseMap>
  );
};
