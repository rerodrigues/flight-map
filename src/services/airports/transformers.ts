import { AirportRaw, Airport, DetailedInfo } from './types';

export const toAirport = (rawAirport: AirportRaw): Airport => {
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

export const toAirportRaw = (airport: Airport): AirportRaw => {
  const createNameFromInfo = (apt: Airport): string => {
    if (apt.city && apt.state) {
      return `${apt.city}/${apt.name}, ${apt.state}`;
    }
    if (apt.city) {
      return `${apt.city}/${apt.name}`;
    }
    return apt.name;
  };

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
