import React from 'react';
import { Marker } from 'react-leaflet';

import AirportIcon from '../AirportIcon';
import SelectedAirportIcon from '../SelectedAirportIcon';
import AirportPopup from '../AirportPopup';
import { Airport } from '../../../../services/airports/types';

interface AirportMarkerProps {
  airport: Airport;
  selected?: boolean;
  onClick?: (airport: Airport) => void;
}

export const AirportMarker: React.FC<AirportMarkerProps> = ({ airport, selected, onClick }: AirportMarkerProps) => {
  const Icon = selected ? SelectedAirportIcon : AirportIcon;
  const clickHandler = (): void => {
    if (onClick) {
      onClick(airport);
    }
  };
  return (
    <Marker position={[airport.lat, airport.lng]} icon={Icon} onClick={clickHandler}>
      <AirportPopup airport={airport} />
    </Marker>
  );
};

export default AirportMarker;
