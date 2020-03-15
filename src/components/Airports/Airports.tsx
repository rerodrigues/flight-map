import React, { useEffect } from 'react';
import { LayerGroup } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import BaseMap from '../BaseMap/Map';
import { Airport } from '../../services/airports/types';
import { AirportMarker, FlightRoutes } from './components';
import { AirportsParams, filterAirportsStart } from './store';
import { TitleControl } from '../BaseMap';
import { filterFlightsStart } from '../Flights';
import { history } from '../../store';
import { useSelector } from '../../util';

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
    dispatch(filterFlightsStart());
  }, [dispatch, params.countryId]);

  const airports = useSelector(state => state.airports.filteredAirportData);
  const flights = useSelector(state => state.flights.filteredFlightsData);

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
        {selected && flights && <FlightRoutes airports={airports} flights={flights} selected={selected} />}
      </LayerGroup>
    </BaseMap>
  );
};

export default Airports;
