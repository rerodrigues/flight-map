import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { useSelector } from '../../util';
import FlightComponent from '../../components/Flight';
import { filterAirportsStart, selectFilteredAirportData } from '../../components/Airports/store';
import { selectSelectedFlight, FlightParams, findFlight } from '../../components/Flight/store';
import { airportsService } from '../../services';

interface LoadAirportParams {
  params: FlightParams;
}

export const Flight: React.FC = () => {
  const dispatch = useDispatch();
  const { params }: LoadAirportParams = useRouteMatch();

  useEffect(() => {
    dispatch(filterAirportsStart());
    dispatch(findFlight({ id: params.id }));
  }, [dispatch, params.id]);

  const airports = useSelector(selectFilteredAirportData);
  const selected = useSelector(selectSelectedFlight);
  const routes = new Map();
  let departureAirport;
  let arrivalAirport;

  if (selected) {
    departureAirport = airportsService.findAirportByIcao(airports, selected.departure.airportCode);
    arrivalAirport = airportsService.findAirportByIcao(airports, selected.arrival.airportCode);

    if (departureAirport && arrivalAirport) {
      const routeId = [departureAirport.icao, arrivalAirport.icao].sort().join('-');
      const airportCoords = [
        [departureAirport.lat, departureAirport.lng],
        [arrivalAirport.lat, arrivalAirport.lng],
      ];
      routes.set(routeId, airportCoords);
    }
  }

  return (
    <FlightComponent
      airports={airports}
      selected={selected}
      routes={routes}
      departure={departureAirport}
      arrival={arrivalAirport}
    />
  );
};

export default Flight;
