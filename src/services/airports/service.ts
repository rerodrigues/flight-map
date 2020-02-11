/* eslint-disable import/prefer-default-export */
import airportRequester from './requester';
import { Airport } from './types';

export const getAirports = airportRequester;

export const getAirportsByCountry = (country: string): Promise<Airport[]> =>
  airportRequester().then(airports =>
    airports.filter(airport => airport.country.toLowerCase() === country.toLowerCase()),
  );

export const getAirportByIata = (iata: string): Promise<Airport | undefined> =>
  airportRequester().then(airports => airports.find(airport => airport.iata.toLowerCase() === iata.toLowerCase()));

export const getAirportByIcao = (icao: string): Promise<Airport | undefined> =>
  airportRequester().then(airports => airports.find(airport => airport.icao.toLowerCase() === icao.toLowerCase()));
