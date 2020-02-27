import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import BaseMap from '../BaseMap/Map';
import { filterAirportsStart, AirportsParams } from './store';
import { useSelector, isRequestSuccess } from '../../util';
import { Airport } from '../../services/airports/types';
import { TitleControl } from '../BaseMap';
import { AirportMarker, FlightRoutes } from './components';

interface LoadAirportsParams {
  params: AirportsParams;
}

export interface AirportsProps {
  selected: Airport | null;
}

export const Airports: React.FC<AirportsProps> = ({ selected }: AirportsProps) => {
  const dispatch = useDispatch();
  const { params }: LoadAirportsParams = useRouteMatch();

  useEffect(() => {
    dispatch(filterAirportsStart({ countryId: params.countryId }));
  }, [dispatch, params.countryId]);

  const airports = useSelector(state => state.airports.filteredAirportData);
  const flights = useSelector(state => state.flights.flightsData);

  return (
    <BaseMap>
      {params.countryId && <TitleControl title={`Airports in ${params.countryId.toUpperCase()}`} />}
      {!params.countryId && <TitleControl title="All Airports" />}

      {airports.map((airport: Airport) => (
        <AirportMarker
          airport={airport}
          key={airport.icao}
          selected={selected !== null && selected.icao.toLowerCase() === airport.icao.toLowerCase()}
        />
      ))}

      {selected && isRequestSuccess(flights) && (
        <FlightRoutes airports={airports} flights={flights.data} selected={selected} />
      )}
    </BaseMap>
  );
};
