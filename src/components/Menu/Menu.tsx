import React, { useState, useCallback } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import Emoji from 'react-easy-emoji';

import {
  Collapse,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from '@material-ui/core';

import FlightIcon from '@material-ui/icons/Flight';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import RoomIcon from '@material-ui/icons/Room';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import HomeIcon from '@material-ui/icons/Home';

export const Menu: React.FC = () => {

  const [airportsOpen, setAirportsOpen] = useState(false);
  const [flightsOpen, setFlightsOpen] = useState(false);

  const handleAirports = useCallback((event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAirportsOpen(!airportsOpen);
  }, [airportsOpen]);

  const handleFlights = useCallback((event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setFlightsOpen(!flightsOpen);
  }, [flightsOpen]);

  return (
    <>
      <Divider />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Lista de opções
          </ListSubheader>
        }
      >
        <ListItem button component={LinkRouter} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Início" />
        </ListItem>

        <Divider />

        <ListItem button onClick={handleAirports}>
          <ListItemIcon>
            <AirlineSeatReclineExtraIcon />
          </ListItemIcon>
          <ListItemText primary="Airports" />
          {airportsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={airportsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={LinkRouter} to="/airports">
              <ListItemIcon>
                <RoomIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="All airports" />
            </ListItem>
            <ListItem button component={LinkRouter} to="/airports/country/brazil">
              <ListItemIcon>
                {Emoji('🇧🇷')}
              </ListItemIcon>
              <ListItemText primary="Airports in Brazil" />
            </ListItem>
            <ListItem button component={LinkRouter} to="/airports/country/spain">
              <ListItemIcon>
                {Emoji('🇪🇸')}
              </ListItemIcon>
              <ListItemText primary="Airports in Spain" />
            </ListItem>
            <ListItem button component={LinkRouter} to="/airport/sbbr">
              <ListItemIcon>
                <RoomIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="SBBR Airport Flights" />
            </ListItem>
          </List>
        </Collapse>

        <Divider />

        <ListItem button onClick={handleFlights}>
          <ListItemIcon>
            <FlightIcon />
          </ListItemIcon>
          <ListItemText primary="Flights" />
          {flightsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={flightsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={LinkRouter} to="/flights">
              <ListItemIcon>
                <FlightTakeoffIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="All flights" />
            </ListItem>
            <ListItem button component={LinkRouter} to="/flights/company/aal">
              <ListItemIcon>
                <FlightTakeoffIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="American Ariline flights" />
            </ListItem>
            <ListItem button component={LinkRouter} to="/flights/company/azu">
              <ListItemIcon>
                <FlightTakeoffIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Azul flights" />
            </ListItem>
            <ListItem button component={LinkRouter} to="/flights/company/kmia">
              <ListItemIcon>
                <FlightTakeoffIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="KMIA flights" />
            </ListItem>
          </List>
        </Collapse>

        <Divider />

      </List>
    </>
  );
};

export default Menu;
