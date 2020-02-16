import React from 'react';
import { Marker } from 'react-leaflet';

import AirportIcon from '../AirportIcon';
import AirportPopup from '../AirportPopup';
import { Airport } from '../../../../services/airports/types';

interface AirportMarkerProps {
  airport: Airport;
}

export const AirportMarker: React.FC<AirportMarkerProps> = ({ airport }: AirportMarkerProps) => (
  <Marker position={[airport.lat, airport.lng]} icon={AirportIcon}>
    <AirportPopup airport={airport} />
  </Marker>
);

export default AirportMarker;
