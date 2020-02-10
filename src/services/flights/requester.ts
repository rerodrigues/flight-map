import axios, { AxiosResponse } from 'axios';
import { Flight, FlightRaw } from './types';
import { toFlight } from './transformers';

export default (): Promise<Flight[] | Error> => {
  const url = process.env.REACT_APP_FLIGHTS_URL;
  if (url) {
    return axios
      .get(url)
      .then(response => response.data)
      .then((rawFlights: AxiosResponse<FlightRaw[]>) => rawFlights.data.map(toFlight));
  }

  return Promise.reject(new Error('No REACT_APP_FLIGHTS_URL defined in environment'));
};
