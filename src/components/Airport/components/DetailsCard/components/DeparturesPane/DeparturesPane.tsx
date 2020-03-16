import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';

import { Flight } from '../../../../../../services/flights';

interface DeparturesPaneProps {
  flights: Flight[];
}

export const DeparturesPane: React.FC<DeparturesPaneProps> = ({ flights }: DeparturesPaneProps) => {
  if (!flights.length) {
    return <div>No departures from this airport</div>;
  }

  return (
    <List dense>
      {flights.map((flight: Flight) => (
        <ListItem button key={flight.id}>
          <ListItemIcon>
            <ArrowForwardIcon />
          </ListItemIcon>
          <ListItemText primary={flight.arrival.airportName} />
        </ListItem>
      ))}
    </List>
  );
};

export default DeparturesPane;
