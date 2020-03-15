/* eslint-disable import/prefer-default-export */
import flightRequester from './requester';
import { Flight } from './types';

export const getFlights = flightRequester;

export const filterFlightsByCompanyCode = (flights: Flight[], companyCode: string): Flight[] =>
  flights.filter(flight => flight.companyCode.toLowerCase() === companyCode.toLowerCase());

export const findFlightByNumber = (flights: Flight[], number: number): Flight | undefined =>
  flights.find(flight => flight.number === number);

export const filterFlightsByIcao = (flights: Flight[], icao: string): Flight[] =>
  flights.filter(
    ({ departure, arrival }) =>
      departure.airportCode.toLowerCase() === icao.toLowerCase() ||
      arrival.airportCode.toLowerCase() === icao.toLowerCase(),
  );
