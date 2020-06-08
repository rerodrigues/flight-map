import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ArrivalsPane from '../ArrivalsPane';
import DeparturesPane from '../DeparturesPane';
import { Airport } from '../../../../../../services/airports';
import { DetailTabs } from '../../DetailsCard';
import { Flight } from '../../../../../../services/flights';
import { filterFlightsStart, selectAirportFlights } from '../../../../../Flights';
import { useSelector } from '../../../../../../util';

export interface DetailsPaneProps {
  selectedPane: number;
  airport: Airport;
}

export type FlightsMap = Map<string, Flight>;

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

export const DetailsPanes: React.FC<DetailsPaneProps> = ({ selectedPane, airport }: DetailsPaneProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterFlightsStart({ icaoCode: airport.icao }));
  }, [airport.icao, dispatch]);

  const flights = useSelector(selectAirportFlights);
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
