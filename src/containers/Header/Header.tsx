import React, { useState, useCallback } from 'react';
import { Map, MapProps, TileLayer } from 'react-leaflet';
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Menu from '../../components/Menu';
import { Link as LinkRouter } from 'react-router-dom';

type HeaderProps = {
};

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const handleDrawerClose = useCallback((open) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpened(open);
  }, [drawerOpened]);
  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerClose(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            <Link color="inherit"variant="h5" component={LinkRouter} to="/">Flight Map</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left"  open={drawerOpened} onClose={handleDrawerClose(false)}>
        <div >
          <IconButton onClick={handleDrawerClose(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Menu />
      </Drawer>
    </>
  );
};

export default Header;
