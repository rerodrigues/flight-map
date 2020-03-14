/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import { Grid, Drawer } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { Airports } from '../Airports';
import { findAirport, AirportParams } from '.';
import { useSelector } from '../../util';

interface LoadAirportParams {
  params: AirportParams;
}

export const Airport: React.FC = () => {
  const dispatch = useDispatch();
  const { params }: LoadAirportParams = useRouteMatch();

  useEffect(() => {
    dispatch(findAirport({ icao: params.icao }));
  }, [dispatch, params.icao]);

  const selectedAirport = useSelector(state => state.airport.selectedAirport);

  return (
    <Grid container direction="row" justify="space-between" alignItems="stretch" className="airport">
      <Airports selected={selectedAirport || undefined} />
      {selectedAirport && (
        <Drawer className="airport__details" variant="permanent" anchor="right">
          <h1>{selectedAirport.name}</h1>
        </Drawer>
      )}
    </Grid>
  );
};
