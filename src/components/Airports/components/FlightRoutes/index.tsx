import React from 'react';
import { Polyline } from 'react-leaflet';

import { LatLngTuple } from 'leaflet';
import { Airport } from '../../../../services/airports/types';
import { Flight } from '../../../../services/flights/types';

interface FlightRouteProps {
  flights: Flight[];
  airports: Airport[];
  selected?: Airport;
}

const FlightRoute: React.FC<FlightRouteProps> = ({ flights, airports, selected }: FlightRouteProps) => {
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

    const filteredFlights = !selected
      ? flights
      : flights.filter(({ departure, arrival }) =>
          [departure.airportCode.toLowerCase(), arrival.airportCode.toLowerCase()].includes(
            selected.icao.toLowerCase(),
          ),
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

  return (
    <>
      {airports.length &&
        Array.from(getUniqueRoutes())
          .filter(route => route[1])
          .map(([key, position]) => (
            <Polyline positions={position} key={key} color="#666" weight={1} opacity={0.5} dashArray={[4, 4, 4]} />
          ))}
    </>
  );
};

export default FlightRoute;
