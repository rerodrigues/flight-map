import React from 'react';
import { Marker } from 'react-leaflet';

import AirportIcon from '../AirportIcon';
import SelectedAirportIcon from '../SelectedAirportIcon';
import AirportPopup from '../AirportPopup';
import { Airport } from '../../../../services/airports/types';

interface AirportMarkerProps {
  airport: Airport;
  selected?: boolean;
}

export const AirportMarker: React.FC<AirportMarkerProps> = ({ airport, selected }: AirportMarkerProps) => {
  const Icon = selected ? SelectedAirportIcon : AirportIcon;
  return (
    <Marker position={[airport.lat, airport.lng]} icon={Icon}>
      <AirportPopup airport={airport} />
    </Marker>
  );
};

export default AirportMarker;
