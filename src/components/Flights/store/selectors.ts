import { compose } from 'redux';
import { createSelector } from 'reselect';

import { LatLngTuple } from 'leaflet';
import { AppState } from '../../../store';
import { FlightsState } from './state';
import { selectFilteredAirportData } from '../../Airports/store/selectors';
import { selectSelectedAirport } from '../../Airport/store';
import { RoutesMap } from '../../Airports/components/FlightRoutes';
import { Airport } from '../../../services/airports';
import { FlightsMap } from '../../Airport/components/DetailsCard/components/DetailsPanes';

export const selectFlights = (state: AppState): FlightsState => state.flights;

export const selectFlightsData = compose(state => state.flightsData, selectFlights);

export const selectFilteredFlightsData = compose(state => state.filteredFlightsData, selectFlights);

export const selectFlightRoutes = createSelector(
  selectFilteredAirportData,
  selectFilteredFlightsData,
  selectSelectedAirport,
  (airports, flights, selectedAirport): RoutesMap => {
    const findAirportByIcao = (icao: string): Airport | undefined =>
      airports.find(airport => airport.icao.toLowerCase() === icao);

    const getAirportCoords = (airport: Airport): LatLngTuple => [airport.lat, airport.lng];

    const getRouteCoordinates = (departureAirport: Airport, arrivalAirport: Airport): LatLngTuple[] => {
      const departureCoords = getAirportCoords(departureAirport);
      const arrivalCoords = getAirportCoords(arrivalAirport);

      return [departureCoords, arrivalCoords];
    };

    const filteredFlights = !selectedAirport
      ? flights
      : flights.filter(({ departure, arrival }) =>
          [departure.airportCode.toLowerCase(), arrival.airportCode.toLowerCase()].includes(
            selectedAirport.icao.toLowerCase(),
          ),
        );

    return filteredFlights.reduce((uniqueRoutes, flight) => {
      const departureCode = flight.departure.airportCode.toLowerCase();
      const arrivalCode = flight.arrival.airportCode.toLowerCase();
      const uniqueId = [departureCode, arrivalCode].sort().join('-');

      if (!uniqueRoutes.has(uniqueId)) {
        const departureAirport = findAirportByIcao(departureCode);
        const arrivalAirport = findAirportByIcao(arrivalCode);

        if (departureAirport && arrivalAirport) {
          uniqueRoutes.set(uniqueId, getRouteCoordinates(departureAirport, arrivalAirport));
        }
      }
      return uniqueRoutes;
    }, new Map());
  },
);

export const selectAirportFlights = createSelector(
  selectFilteredFlightsData,
  (flights): FlightsMap =>
    flights.reduce((uniqueFlights, flight) => {
      const departureCode = flight.departure.airportCode.toLowerCase();
      const arrivalCode = flight.arrival.airportCode.toLowerCase();
      const uniqueId = [departureCode, arrivalCode].join('-');

      if (!uniqueFlights.has(uniqueId)) {
        uniqueFlights.set(uniqueId, flight);
      }
      return uniqueFlights;
    }, new Map()),
);
