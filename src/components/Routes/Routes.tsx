import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Airports, Flights, Airport, Menu } from '..';

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/airports" component={Airports} />
    <Route exact path="/airports/country/:countryId" component={Airports} />
    <Route exact path="/flights" component={Flights} />
    <Route exact path="/flights/company/:companyCode" component={Flights} />
    <Route exact path="/flights/airport/:icaoCode" component={Flights} />
    <Route exact path="/airport/:icao" component={Airport} />
    <Route path="/menu" component={Menu} />
    <Route path="/" component={Airports} />
  </Switch>
);

export default Routes;
