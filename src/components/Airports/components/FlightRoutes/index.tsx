/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react';
// @ts-ignore
import { Curve } from 'react-leaflet-curve';
import { LatLngTuple } from 'leaflet';
import { withLeaflet } from 'react-leaflet';

import { Airport } from '../../../../services/airports/types';
import { Flight } from '../../../../services/flights/types';
import { curvedPath } from '../../../../util';

const WrappedCurve = withLeaflet(Curve);

export type RoutesMap = Map<string, LatLngTuple[]>;
interface FlightRouteProps {
  routes: RoutesMap;
}

export const getUniqueRoutes = (airports: Airport[], flights: Flight[], selected?: Airport): RoutesMap => {
  const getAirportPosition = (icao: string): LatLngTuple | null => {
    const foundAiport = airports.find(airport => airport.icao === icao);

    return foundAiport ? [foundAiport.lat, foundAiport.lng] : null;
  };

  const getPositions = (code: string[]): LatLngTuple[] | null => {
    const departure = getAirportPosition(code[0]);
    const arrival = getAirportPosition(code[1]);

    return departure && arrival ? [departure, arrival] : null;
  };

  const uniqueRoutes = new Map();

  const filteredFlights = !selected
    ? flights
    : flights.filter(({ departure, arrival }) =>
        [departure.airportCode.toLowerCase(), arrival.airportCode.toLowerCase()].includes(selected.icao.toLowerCase()),
      );

  filteredFlights.forEach(flight => {
    const departureCode = flight.departure.airportCode;
    const arrivalCode = flight.arrival.airportCode;
    const uniqueId = [departureCode, arrivalCode].sort().join('-');

    if (!uniqueRoutes.has(uniqueId)) {
      uniqueRoutes.set(uniqueId, getPositions([departureCode, arrivalCode]));
    }
  });
  return uniqueRoutes;
};

const FlightRoute: React.FC<FlightRouteProps> = ({ routes }: FlightRouteProps) => {
  return (
    <>
      {Array.from(routes)
        .filter(route => route[1])
        .map(([key, [departureCoords, arrivalCoords]]) => {
          const [M, Q, endPoint] = curvedPath(departureCoords, arrivalCoords);
          const positions = ['M', M, 'Q', Q, endPoint];
          const options = { color: '#ae044d', weight: 2, opacity: 0.6, dashArray: [3, 6] };
          // @ts-ignore
          return <WrappedCurve positions={positions} key={key} option={options} />;
        })}
    </>
  );
};

export default FlightRoute;
