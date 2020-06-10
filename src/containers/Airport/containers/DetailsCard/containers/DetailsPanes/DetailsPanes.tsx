import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ArrivalsPane from '../../../../../../components/Airport/components/DetailsCard/components/ArrivalsPane';
import DeparturesPane from '../../../../../../components/Airport/components/DetailsCard/components/DeparturesPane';
import { Airport } from '../../../../../../services/airports';
import { DetailTabs } from '../../../../../../components/Airport/components/DetailsCard';
import { Flight } from '../../../../../../services/flights';
import { filterFlightsStart, selectAirportFlights } from '../../../../../../components/Flights/store';
import { useSelector } from '../../../../../../util';

export interface DetailsPaneProps {
  selectedPane: number;
  airport: Airport;
}

export type FlightsMap = Map<string, Flight>;

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
