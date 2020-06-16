import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

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
        <Typography gutterBottom variant="h5" component="p">
          {flight!.companyCode}
          {flight!.number} - {flight!.company}
        </Typography>
        <Typography gutterBottom variant="h5" component="p">
          {departure!.name}
        </Typography>
        <Typography gutterBottom variant="body2" component="p">
          {createNameFromInfo(departure!)}
        </Typography>
        <Typography gutterBottom variant="h5" component="p">
          {arrival!.name}
        </Typography>
        <Typography gutterBottom variant="body2" component="p">
          {createNameFromInfo(arrival!)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
