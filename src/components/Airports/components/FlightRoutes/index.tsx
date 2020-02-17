import React from 'react';
import { Polyline } from 'react-leaflet';

import { LatLngTuple } from 'leaflet';
import { Airport } from '../../../../services/airports/types';
import { Flight } from '../../../../services/flights/types';

interface FlightRouteProps {
  flights: Flight[];
  airports: Airport[];
}

export const FlightRoute: React.FC<FlightRouteProps> = ({ flights, airports }: FlightRouteProps) => {
  const getAirportPosition = (icao: string): LatLngTuple | null => {
    const foundAiport = airports.find(airport => airport.icao === icao);

    return foundAiport ? [foundAiport.lat, foundAiport.lng] : null;
  };

  const getPositions = (code: string[]): LatLngTuple[] | null => {
    const departure = getAirportPosition(code[0]);
    const arrival = getAirportPosition(code[1]);

    return departure && arrival ? [departure, arrival] : null;
  };

  const getUniqueRoutes = (): Map<string, LatLngTuple[]> => {
    const uniqueRoutes = new Map();

    flights.forEach(flight => {
      const departureCode = flight.departure.airportCode;
      const arrivalCode = flight.arrival.airportCode;
      const uniqueId = [departureCode, arrivalCode].sort().join('-');

      if (!uniqueRoutes.has(uniqueId)) {
        uniqueRoutes.set(uniqueId, getPositions([departureCode, arrivalCode]));
      }
    });

    return uniqueRoutes;
  };

  return (
    <>
      {airports.length &&
        Array.from(getUniqueRoutes())
          .filter(route => route[1])
          .map(([key, position]) => (
            <Polyline positions={position} key={key} color="#ccc" weight={1} opacity={0.5} dashArray={[4, 1]} />
          ))}
    </>
  );
};

export default FlightRoute;
