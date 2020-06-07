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

export const getUniqueRoutes = (airports: Airport[], flights: Flight[], selectedAirport?: Airport): RoutesMap => {
  const findAirportByIcao = (icao: string): Airport | undefined =>
    airports.find(airport => airport.icao.toLowerCase() === icao);

  const getAirportCoords = (airport: Airport): LatLngTuple => [airport.lat, airport.lng];

  const getRouteCoordinates = (departureAirport: Airport, arrivalAirport: Airport): LatLngTuple[] => {
    const departureCoords = getAirportCoords(departureAirport);
    const arrivalCoords = getAirportCoords(arrivalAirport);

    return [departureCoords, arrivalCoords];
  };

  const uniqueRoutes = new Map();

  const filteredFlights = !selectedAirport
    ? flights
    : flights.filter(({ departure, arrival }) =>
        [departure.airportCode.toLowerCase(), arrival.airportCode.toLowerCase()].includes(
          selectedAirport.icao.toLowerCase(),
        ),
      );

  filteredFlights.forEach(flight => {
    const departureCode = flight.departure.airportCode.toLowerCase();
    const arrivalCode = flight.arrival.airportCode.toLowerCase();
    const uniqueId = [departureCode, arrivalCode].sort().join('-');

    if (!uniqueRoutes.has(uniqueId)) {
      const departureAirport = findAirportByIcao(departureCode);
      const arrivalAirport = findAirportByIcao(arrivalCode);

      if (departureAirport && arrivalAirport) {
        uniqueRoutes.set(uniqueId, getRouteCoordinates(departureAirport, arrivalAirport));
      }
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
