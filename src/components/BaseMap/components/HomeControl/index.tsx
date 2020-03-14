import React from 'react';
import Control from 'react-leaflet-control';
import { history } from '../../../../store';

const BackControl: React.FC = () => (
  <Control position="topleft">
    <button type="button" onClick={() => history.push('/')} title="Home">
      ⌂
    </button>
  </Control>
);

export default BackControl;
