/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import { LayerGroup } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { LatLngBoundsExpression } from 'leaflet';
import BaseMap from '../BaseMap/Map';
import { AirportMarker, FlightRoutes } from '../Airports/components';
import { AirportParams, findAirport, selectSelectedAirport } from '.';
import { Airport as AirportType } from '../../services/airports/types';
import { DetailsCard } from './components';
import { RoutesMap, getUniqueRoutes } from '../Airports/components/FlightRoutes';
import { filterAirportsStart, selectFilteredAirportData } from '../Airports';
import { history } from '../../store';
import { selectFilteredFlightsData } from '../Flights';
import { useSelector } from '../../util';

interface LoadAirportParams {
  params: AirportParams;
}

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
}));

const handleMarkerClick = (airport: AirportType): void => {
  history.push(`/airport/${airport.icao.toLowerCase()}`);
};

const getBounds = (routesMap: RoutesMap): LatLngBoundsExpression | undefined =>
  routesMap.size ? Array.from(routesMap.values()).flatMap(coords => coords) : undefined;

export const Airport: React.FC = () => {
  const dispatch = useDispatch();
  const { params }: LoadAirportParams = useRouteMatch();

  useEffect(() => {
    dispatch(filterAirportsStart());
    dispatch(findAirport({ icao: params.icao }));
  }, [dispatch, params.icao]);

  const airports = useSelector(selectFilteredAirportData);
  const flights = useSelector(selectFilteredFlightsData);
  const selected = useSelector(selectSelectedAirport);

  const classes = useStyles();
  const routes = getUniqueRoutes(airports, flights, selected);

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={9} zeroMinWidth>
        <BaseMap bounds={getBounds(routes)} boundsOptions={{ padding: [150, 150] }}>
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

          <LayerGroup>{selected && routes && <FlightRoutes routes={routes} />}</LayerGroup>
        </BaseMap>
      </Grid>
      {selected && (
        <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square zeroMinWidth>
          <DetailsCard airport={selected} />
        </Grid>
      )}
    </Grid>
  );
};

export default Airport;
