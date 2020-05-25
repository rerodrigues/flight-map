/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { AirportParams, findAirport, selectSelectedAirport } from '.';
import { Airports } from '../Airports';
import { DetailsCard } from './components';
import { useSelector } from '../../util';

interface LoadAirportParams {
  params: AirportParams;
}

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
}));

export const Airport: React.FC = () => {
  const dispatch = useDispatch();
  const { params }: LoadAirportParams = useRouteMatch();

  useEffect(() => {
    dispatch(findAirport({ icao: params.icao }));
  }, [dispatch, params.icao]);

  const selectedAirport = useSelector(selectSelectedAirport);

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={9} zeroMinWidth>
        <Airports selected={selectedAirport || undefined} />
      </Grid>
      {selectedAirport && (
        <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square zeroMinWidth>
          <DetailsCard airport={selectedAirport} />
        </Grid>
      )}
    </Grid>
  );
};

export default Airport;
