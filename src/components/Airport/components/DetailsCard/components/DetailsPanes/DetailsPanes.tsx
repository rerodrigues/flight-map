import React from 'react';

import ArrivalsPane from '../ArrivalsPane';
import DeparturesPane from '../DeparturesPane';
import { Airport } from '../../../../../../services/airports';
import { DetailTabs } from '../../DetailsCard';
import { Flight } from '../../../../../../services/flights';
import { FlightsMap } from '../../../../../Flights/store/types';

export interface DetailsPaneProps {
  selectedPane: number;
  airport: Airport;
  flights: FlightsMap;
}

export const getFlightCodes = (flight: Flight): string[] => {
  const flightCode = `${flight.companyCode.toUpperCase()}${flight.number}`;
  if (flight.codeshare) {
    const codeshares = flight.codeshare.split(' - ');
    codeshares.unshift(flightCode);
    return codeshares.map((codeshare: string) => codeshare.replace('/', ''));
  }
  return [flightCode];
};

const getCategorizedFligths = (flights: FlightsMap, airportCode: string): Array<Flight[]> =>
  Array.from(flights.values()).reduce(
    (accumulated: Array<Flight[]>, flight: Flight) => {
      const accumulatedFlights = [...accumulated];
      if (flight.departure.airportCode === airportCode) {
        accumulatedFlights[DetailTabs.DEPARTURES].push(flight);
      } else {
        accumulatedFlights[DetailTabs.ARRIVALS].push(flight);
      }
      return accumulatedFlights;
    },
    [[], []],
  );

export const DetailsPanes: React.FC<DetailsPaneProps> = (props: DetailsPaneProps) => {
  const { selectedPane, airport, flights } = props;

  const [departures, arrivals] = getCategorizedFligths(flights, airport.icao);

  const Pane =
    selectedPane === DetailTabs.ARRIVALS ? (
      <ArrivalsPane flights={arrivals} />
    ) : (
      <DeparturesPane flights={departures} />
    );

  return Pane;
};

export default DetailsPanes;
