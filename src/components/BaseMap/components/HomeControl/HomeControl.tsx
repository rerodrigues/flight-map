import React from 'react';
import Control from 'react-leaflet-control';
import HomeIcon from '@material-ui/icons/Home';
import { history } from '../../../../store';

export const HomeControl: React.FC = () => (
  <Control position="topleft">
    <button type="button" onClick={() => history.push('/')} title="Home">
      <HomeIcon />
    </button>
  </Control>
);

export default HomeControl;
