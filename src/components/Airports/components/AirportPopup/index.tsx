import React from 'react';
import { Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Airport } from '../../../../services/airports/types';

interface AirportPopupProps {
  airport: Airport;
}

const AirportPopup: React.FC<AirportPopupProps> = ({ airport }: AirportPopupProps) => (
  <Popup>
    <h3>Airport: {airport.name}</h3>
    <h4>
      Country:
      <Link to={`/airports/country/${airport.country}`}>{airport.country}</Link>
    </h4>
    <h4>
      <Link to={`/flights/airport/${airport.icao}`}>All Flights from this airport</Link>
    </h4>
  </Popup>
);

export default AirportPopup;
