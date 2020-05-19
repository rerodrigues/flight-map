/* eslint-disable import/prefer-default-export */
import flightRequester from './requester';
import { Flight } from './types';

export const getFlights = flightRequester;

export const getFlightsByCompanyCode = (companyCode: string): Promise<Flight[]> =>
  flightRequester().then(flights =>
    flights.filter(flight => flight.companyCode.toLowerCase() === companyCode.toLowerCase()),
  );

export const getFlightByNumber = (number: number): Promise<Flight | undefined> =>
  flightRequester().then(flights => flights.find(flight => flight.number === number));

export const getFlightsByIcaoCode = (icao: string): Promise<Flight[]> =>
  flightRequester().then(flights =>
    flights.filter(
      ({ departure, arrival }) =>
        departure.airportCode.toLowerCase() === icao.toLowerCase() ||
        arrival.airportCode.toLowerCase() === icao.toLowerCase(),
    ),
  );
