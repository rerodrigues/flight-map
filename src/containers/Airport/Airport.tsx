import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { Airport as AirportType } from '../../services/airports';
import { history } from '../../store';
import { useSelector } from '../../util';
import AirportComponent from '../../components/Airport';
import { AirportParams, findAirport, selectSelectedAirport } from '../../components/Airport/store';
import { filterAirportsStart, selectFilteredAirportData } from '../../components/Airports/store';
import { selectFlightRoutes, filterFlightsStart, selectAirportFlights } from '../../components/Flights/store';

interface LoadAirportParams {
  params: AirportParams;
}

const handleMarkerClick = (airport: AirportType): void => {
  history.push(`/airport/${airport.icao.toLowerCase()}`);
};

export const Airport: React.FC = () => {
  const dispatch = useDispatch();
  const { params }: LoadAirportParams = useRouteMatch();

  useEffect(() => {
    dispatch(filterAirportsStart());
    dispatch(findAirport({ icao: params.icao }));
    dispatch(filterFlightsStart({ icaoCode: params.icao }));
  }, [dispatch, params.icao]);

  const airports = useSelector(selectFilteredAirportData);
  const selected = useSelector(selectSelectedAirport);
  const routes = useSelector(selectFlightRoutes);
  const flights = useSelector(selectAirportFlights);

  return (
    <AirportComponent
      airports={airports}
      selected={selected}
      routes={routes}
      flights={flights}
      onMarkerClick={handleMarkerClick}
    />
  );
};

export default Airport;
