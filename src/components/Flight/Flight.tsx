import React from 'react';
import { Grid } from '@material-ui/core';
import { LayerGroup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

import BaseMap from '../BaseMap';
import { AirportMarker, FlightRoutes } from '../Airports';
import { Airport as AirportType, Airport } from '../../services/airports';
import { DetailsCard } from './components';
import { RoutesMap } from '../Flights/store/types';
import { Flight as FlightType } from '../../services/flights';

interface FlightProps {
  airports: AirportType[];
  selected?: FlightType;
  routes: RoutesMap;
  departure?: Airport;
  arrival?: Airport;
  // onMarkerClick: (airport: AirportType) => void;
}

const getCenter = (selected?: AirportType): LatLngTuple | undefined =>
  selected ? [selected.lat, selected.lng] : undefined;

export const Flight: React.FC<FlightProps> = (props: FlightProps) => {
  const { airports, selected, routes, departure, arrival } = props;

  return (
    <Grid container>
      <Grid item xs={false} sm={4} md={9}>
        <BaseMap center={getCenter(departure)}>
          <LayerGroup>
            {airports.map((airport: AirportType) => (
              <AirportMarker
                airport={airport}
                key={airport.icao}
                selected={selected && selected.departure.airportCode.toLowerCase() === airport.icao.toLowerCase()}
              />
            ))}
          </LayerGroup>

          <LayerGroup>{routes && <FlightRoutes routes={routes} />}</LayerGroup>
        </BaseMap>
      </Grid>
      {selected && (
        <Grid item xs={12} sm={8} md={3}>
          <DetailsCard flight={selected} departure={departure} arrival={arrival} />
        </Grid>
      )}
    </Grid>
  );
};

export default Flight;
