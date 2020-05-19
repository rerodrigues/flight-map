/* eslint-disable import/prefer-default-export */
import airportRequester from './requester';
import { Airport } from './types';

export const getAirports = airportRequester;

export const filterAirportsByCountry = (airports: Airport[], country: string): Airport[] =>
  airports.filter(airport => airport.country.toLowerCase() === country.toLowerCase());

export const findAirportByIata = (airports: Airport[], iata: string): Airport | undefined =>
  airports.find(airport => airport.iata && airport.iata.toLowerCase() === iata.toLowerCase());

export const findAirportByIcao = (airports: Airport[], icao: string): Airport | undefined =>
  airports.find(airport => airport.icao && airport.icao.toLowerCase() === icao.toLowerCase());
