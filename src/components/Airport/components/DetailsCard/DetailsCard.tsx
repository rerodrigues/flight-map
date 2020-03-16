import React from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';

import { Airport, createNameFromInfo } from '../../../../services/airports';
import { DetailsPanes, DetailsTabs } from './components';

interface DetailsCardProps {
  airport: Airport;
}

export enum DetailTabs {
  DEPARTURES,
  ARRIVALS,
}

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
}));

export const DetailsCard: React.FC<DetailsCardProps> = ({ airport }: DetailsCardProps) => {
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
      <DetailsPanes selectedPane={activeTab} airport={airport} />
    </Card>
  );
};

export default DetailsCard;
