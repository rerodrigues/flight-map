import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';

import { Flight } from '../../../../../../services/flights';
import { formatFlightCode } from '../DetailsPanes';

interface ArrivalsPaneProps {
  flights: Flight[];
}

export const ArrivalsPane: React.FC<ArrivalsPaneProps> = ({ flights }: ArrivalsPaneProps) => {
  if (!flights.length) {
    return <div>No arrivals in this airport</div>;
  }

  return (
    <List dense>
      {flights.map((flight: Flight) => (
        <ListItem button key={flight.id}>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText
            primary={flight.departure.airportName}
            secondary={`${formatFlightCode(flight).join(', ')} - ${flight.company}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ArrivalsPane;
