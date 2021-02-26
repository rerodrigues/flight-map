import { Airport, AirportRaw, DetailedInfo } from './types';

const getInfoFromName = (name: string): DetailedInfo => {
  const nameRegex = /^([^/]+)\/([^,]+)(?:,\s*(\w{2}))?/;
  const info = name.match(nameRegex);

  return info
    ? {
        name: info[2],
        city: info[1],
        state: info[3],
      }
    : { name };
};

export const toAirport = (rawAirport: AirportRaw): Airport => {
  const detailedInfo = getInfoFromName(rawAirport.name);

  return {
    country: rawAirport.country,
    icao: rawAirport.icao,
    iata: rawAirport.iata,
    name: detailedInfo.name,
    lat: rawAirport.lat,
    lng: rawAirport.lng,
    city: detailedInfo.city,
    state: detailedInfo.state,
  };
};

export const createNameFromInfo = (airport: Airport): string => {
  if (airport.city && airport.state) {
    return `${airport.city}/${airport.state}, ${airport.country}`;
  }
  if (airport.city) {
    return `${airport.city}/${airport.country}`;
  }
  return airport.country;
};

export const toAirportRaw = (airport: Airport): AirportRaw => {
  const fullName = createNameFromInfo(airport);

  return {
    country: airport.country,
    icao: airport.icao,
    iata: airport.iata,
    name: fullName,
    lat: airport.lat,
    lng: airport.lng,
  };
};
