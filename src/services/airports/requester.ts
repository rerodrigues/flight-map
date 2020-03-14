import axios from 'axios';
import { Airport, AirportRaw } from './types';
import { toAirport } from './transformers';

export default async (): Promise<Airport[]> => {
  const url = process.env.REACT_APP_AIRPORTS_URL || undefined;
  if (url) {
    return axios
      .get(url)
      .then(response => response.data)
      .then((rawAirports: AirportRaw[]) => rawAirports.map(toAirport));
  }

  return Promise.reject(new Error('No REACT_APP_AIRPORTS_URL defined in environment'));
};
