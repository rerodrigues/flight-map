import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Flights, Airports, Menu } from '..';
import { Airport, Flight } from '../../containers';

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path={['/airports', '/airports/country/:countryId']}>
      <Airports />
    </Route>
    <Route exact path={['/flights', '/flights/company/:companyCode', '/flights/airport/:icaoCode']}>
      <Flights />
    </Route>
    <Route exact path="/airport/:icao">
      <Airport />
    </Route>
    <Route exact path="/flight/:id">
      <Flight />
    </Route>
    <Route path="/menu">
      <Menu />
    </Route>
    <Route path="/">
      <Airports />
    </Route>
  </Switch>
);

export default Routes;
