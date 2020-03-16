import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';

export interface DetailsTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newTab: number) => void;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export const DetailsTabs: React.FC<DetailsTabsProps> = (props: DetailsTabsProps) => {
  const classes = useStyles();

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={props.value}
        onChange={props.onChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<FlightTakeoffIcon />} label="Departures" />
        <Tab icon={<FlightLandIcon />} label="Arrivals" />
        {/* <Tab icon={<BusinessIcon />} label="Companies" /> */}
      </Tabs>
    </Paper>
  );
};

export default DetailsTabs;
