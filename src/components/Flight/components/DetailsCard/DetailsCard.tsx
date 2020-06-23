import FlightIcon from '@material-ui/icons/Flight';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';

import { Airport, createNameFromInfo } from '../../../../services/airports';
import { Flight } from '../../../../services/flights/types';
import { aircraftManufacturers } from '../../../Flights/store/types';
import { useStyles } from './styles';

interface DetailsCardProps {
  departure?: Airport;
  arrival?: Airport;
  flight?: Flight;
}

const getManufacturer = (planeModel: string): string => {
  const modelMatch = planeModel.toUpperCase().match(/^[A-Z]+/);
  if (modelMatch) {
    const manufacturers = new Map(Object.entries(aircraftManufacturers));
    return manufacturers.get(modelMatch[0]) || 'Model';
  }

  return 'Model';
};

export const DetailsCard: React.FC<DetailsCardProps> = (props: DetailsCardProps) => {
  const { departure, arrival, flight } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.section1}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4">
                {flight!.companyCode}
                {flight!.number}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6">
                {flight!.company}
              </Typography>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <List className={classes.list}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FlightTakeoffIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={departure!.name} secondary={createNameFromInfo(departure!)} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FlightLandIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={arrival!.name} secondary={createNameFromInfo(arrival!)} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FlightIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${getManufacturer(flight!.planeModel)} ${flight!.planeModel}`}
              secondary={`${flight!.numberOfSeats} seats`}
            />
          </ListItem>
        </List>
        <Divider />
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
