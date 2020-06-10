import React from 'react';
import { Grid } from '@material-ui/core';
import { LayerGroup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

import BaseMap from '../BaseMap';
import { AirportMarker, FlightRoutes } from '../Airports';
import { Airport as AirportType } from '../../services/airports';
import { RoutesMap } from '../Airports/components/FlightRoutes';
import { DetailsCard } from './components';

interface AirportProps {
  airports: AirportType[];
  selected?: AirportType;
  routes: RoutesMap;
  onMarkerClick: (airport: AirportType) => void;
}

const getCenter = (selected?: AirportType): LatLngTuple | undefined =>
  selected ? [selected.lat, selected.lng] : undefined;

export const Airport: React.FC<AirportProps> = (props: AirportProps) => {
  const { airports, selected, routes, onMarkerClick } = props;

  return (
    <Grid container>
      <Grid item xs={false} sm={4} md={9}>
        <BaseMap center={getCenter(selected)}>
          <LayerGroup>
            {airports.map((airport: AirportType) => (
              <AirportMarker
                airport={airport}
                key={airport.icao}
                selected={selected && selected.icao.toLowerCase() === airport.icao.toLowerCase()}
                onClick={onMarkerClick}
              />
            ))}
          </LayerGroup>

          <LayerGroup>{routes && <FlightRoutes routes={routes} />}</LayerGroup>
        </BaseMap>
      </Grid>
      {selected && (
        <Grid item xs={12} sm={8} md={3}>
          <DetailsCard airport={selected} />
        </Grid>
      )}
    </Grid>
  );
};

export default Airport;
