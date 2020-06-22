import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';

import { Airport, createNameFromInfo } from '../../../../services/airports';
import { useStyles } from './styles';
import { Flight } from '../../../../services/flights/types';

interface DetailsCardProps {
  departure?: Airport;
  arrival?: Airport;
  flight?: Flight;
}

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
        </List>
        <Divider />
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
