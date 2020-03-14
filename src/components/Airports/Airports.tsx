import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { LayerGroup } from 'react-leaflet';
import BaseMap from '../BaseMap/Map';
import { filterAirportsStart, AirportsParams } from './store';
import { useSelector, isRequestSuccess } from '../../util';
import { Airport } from '../../services/airports/types';
import { TitleControl } from '../BaseMap';
import { AirportMarker, FlightRoutes } from './components';
import { history } from '../../store';

interface LoadAirportsParams {
  params: AirportsParams;
}

export interface AirportsProps extends React.HTMLAttributes<HTMLElement> {
  selected?: Airport;
}

const handleMarkerClick = (airport: Airport): void => {
  history.push(`/airport/${airport.icao.toLowerCase()}`);
};

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

      <LayerGroup>
        {airports.map((airport: Airport) => (
          <AirportMarker
            airport={airport}
            key={airport.icao}
            selected={selected && selected.icao.toLowerCase() === airport.icao.toLowerCase()}
            onClick={handleMarkerClick}
          />
        ))}
      </LayerGroup>

      <LayerGroup>
        {selected && isRequestSuccess(flights) && (
          <FlightRoutes airports={airports} flights={flights.data} selected={selected} />
        )}
      </LayerGroup>
    </BaseMap>
  );
};
