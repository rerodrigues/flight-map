import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Popup } from 'react-leaflet';
import { makeStyles } from '@material-ui/core/styles';

import { Airport } from '../../../../services/airports/types';

interface AirportPopupProps {
  airport: Airport;
}

const useStyles = makeStyles({
  root: {},
  subtitle: {
    marginBottom: 12,
  },
});

const AirportPopup: React.FC<AirportPopupProps> = ({ airport }: AirportPopupProps) => {
  const classes = useStyles();

  return (
    <Popup closeButton={false}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {airport.name}
          </Typography>
          <Typography className={classes.subtitle} color="textSecondary">
            Country: <Link to={`/airports/country/${airport.country}`}>{airport.country}</Link>
          </Typography>
          <Typography variant="body2" component="p">
            <Link to={`/flights/airport/${airport.icao}`}>All Flights from this airport</Link>
          </Typography>
        </CardContent>
      </Card>
    </Popup>
  );
};

export default AirportPopup;
