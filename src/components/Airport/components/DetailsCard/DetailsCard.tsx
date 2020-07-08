import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import { Airport, createNameFromInfo } from '../../../../services/airports';
import { DetailsPanes, DetailsTabs } from './components';
import { useStyles } from './styles';
import { FlightsMap } from '../../../Flights/store/types';

interface DetailsCardProps {
  airport: Airport;
  flights: FlightsMap;
}

export enum DetailTabs {
  DEPARTURES,
  ARRIVALS,
}

export const DetailsCard: React.FC<DetailsCardProps> = (props: DetailsCardProps) => {
  const { airport, flights } = props;

  const classes = useStyles();

  const [activeTab, setValue] = React.useState(DetailTabs.DEPARTURES);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newTab: DetailTabs): void => {
    setValue(newTab);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {airport.name}
        </Typography>
        <Typography gutterBottom variant="body2" component="p">
          {createNameFromInfo(airport)}
        </Typography>
      </CardContent>
      <DetailsTabs value={activeTab} onChange={handleChangeTab} />
      <DetailsPanes selectedPane={activeTab} airport={airport} flights={flights} />
    </Card>
  );
};

export default DetailsCard;
