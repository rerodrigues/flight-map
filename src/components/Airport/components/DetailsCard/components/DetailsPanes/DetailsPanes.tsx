import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ArrivalsPane from '../ArrivalsPane';
import DeparturesPane from '../DeparturesPane';
import { Airport } from '../../../../../../services/airports';
import { DetailTabs } from '../../DetailsCard';
import { Flight } from '../../../../../../services/flights';
import { filterFlightsStart } from '../../../../../Flights';
import { flightsService } from '../../../../../../services';
import { useSelector } from '../../../../../../util';

export interface DetailsPaneProps {
  selectedPane: number;
  airport: Airport;
}

const getUniqueFligths = (flights: Flight[]): Map<string, Flight> => {
  const uniqueFlights = new Map();

  flights.forEach(flight => {
    const departureCode = flight.departure.airportCode;
    const arrivalCode = flight.arrival.airportCode;
    const uniqueId = [departureCode, arrivalCode].join('-');

    if (!uniqueFlights.has(uniqueId)) {
      uniqueFlights.set(uniqueId, flight);
    }
  });
  return uniqueFlights;
};

const getCategorizedFligths = (airportFlights: Flight[], airport: Airport): Array<Flight[]> =>
  Array.from(getUniqueFligths(airportFlights).values()).reduce(
    (accumulated: Array<Flight[]>, flight: Flight) => {
      const accumulatedFlights = [...accumulated];
      if (flight.departure.airportCode === airport.icao) {
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
    dispatch(filterFlightsStart());
  }, [dispatch]);

  const flights = useSelector(state => state.flights.filteredFlightsData);
  const airportFlights = flightsService.filterFlightsByIcao(flights, airport.icao);
  const [departures, arrivals] = getCategorizedFligths(airportFlights, airport);

  const Pane =
    selectedPane === DetailTabs.ARRIVALS ? (
      <ArrivalsPane flights={arrivals} />
    ) : (
      <DeparturesPane flights={departures} />
    );

  return Pane;
};

export default DetailsPanes;
