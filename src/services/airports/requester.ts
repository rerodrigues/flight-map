import axios from 'axios';
import { Airport } from './types';

export default async (): Promise<Airport[]> => {
  const url = process.env.REACT_APP_AIRPORTS_URL || undefined;
  if (url) {
    return axios.get(url).then(response => response.data);
  }

  return Promise.reject(new Error('No REACT_APP_AIRPORTS_URL defined in environment'));
};
