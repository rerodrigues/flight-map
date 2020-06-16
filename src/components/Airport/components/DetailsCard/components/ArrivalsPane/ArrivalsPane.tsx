import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';

import { Link } from 'react-router-dom';
import { Flight } from '../../../../../../services/flights';
import { getFlightCodes } from '../DetailsPanes';
import { useStyles } from '../DetailsPanes/styles';

interface ArrivalsPaneProps {
  flights: Flight[];
}

export const ArrivalsPane: React.FC<ArrivalsPaneProps> = ({ flights }: ArrivalsPaneProps) => {
  const classes = useStyles();

  if (!flights.length) {
    return <div>No arrivals in this airport</div>;
  }

  return (
    <List dense>
      {flights.map((flight: Flight) => (
        <Link className={classes.link} to={`/flight/${flight.id}`} key={flight.id}>
          <ListItem button>
            <ListItemIcon>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText
              primary={flight.departure.airportName}
              secondary={`${getFlightCodes(flight).join(', ')} - ${flight.company}`}
            />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default ArrivalsPane;
