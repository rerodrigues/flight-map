import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Popup } from 'react-leaflet';
import * as styles from './styles';
import { Airport } from '../../../../services/airports/types';

interface AirportPopupProps {
  airport: Airport;
}

export const AirportPopup: React.FC<AirportPopupProps> = ({ airport }: AirportPopupProps) => {
  const classes = styles.airportPopup();

  return (
    <Popup closeButton={false}>
      <Typography className={classes.title} variant="h5" component="h2">
        {airport.name}
      </Typography>
      <Typography className={classes.subtitle} color="textSecondary">
        Country: <Link to={`/airports/country/${airport.country}`}>{airport.country}</Link>
      </Typography>
      <Typography variant="body2" component="p">
        <Link to={`/flights/airport/${airport.icao}`}>All Flights from this airport</Link>
      </Typography>
    </Popup>
  );
};

export default AirportPopup;
