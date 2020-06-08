import React, { useEffect } from 'react';
import { LayerGroup } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { LatLngTuple } from 'leaflet';
import BaseMap from '../BaseMap/Map';
import { AirportMarker, FlightRoutes } from '../Airports/components';
import { AirportParams, findAirport, selectSelectedAirport } from '.';
import { Airport as AirportType } from '../../services/airports/types';
import { DetailsCard } from './components';
import { filterAirportsStart, selectFilteredAirportData } from '../Airports';
import { history } from '../../store';
import { selectFlightRoutes } from '../Flights';
import { useSelector } from '../../util';

interface LoadAirportParams {
  params: AirportParams;
}

const handleMarkerClick = (airport: AirportType): void => {
  history.push(`/airport/${airport.icao.toLowerCase()}`);
};

const getCenter = (selected?: AirportType): LatLngTuple | undefined =>
  selected ? [selected.lat, selected.lng] : undefined;

export const Airport: React.FC = () => {
  const dispatch = useDispatch();
  const { params }: LoadAirportParams = useRouteMatch();

  useEffect(() => {
    dispatch(filterAirportsStart());
    dispatch(findAirport({ icao: params.icao }));
  }, [dispatch, params.icao]);

  const airports = useSelector(selectFilteredAirportData);
  const selected = useSelector(selectSelectedAirport);
  const routes = useSelector(selectFlightRoutes);

  return (
    <>
      <BaseMap center={getCenter(selected)}>
        <LayerGroup>
          {airports.map((airport: AirportType) => (
            <AirportMarker
              airport={airport}
              key={airport.icao}
              selected={selected && selected.icao.toLowerCase() === airport.icao.toLowerCase()}
              onClick={handleMarkerClick}
            />
          ))}
        </LayerGroup>

        <LayerGroup>{routes && <FlightRoutes routes={routes} />}</LayerGroup>
      </BaseMap>
      {selected && <DetailsCard airport={selected} />}
    </>
  );
};

export default Airport;
