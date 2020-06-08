import React from 'react';
import Control from 'react-leaflet-control';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { history } from '../../../../store';

export const BackControl: React.FC = () => (
  <Control position="topleft">
    <button type="button" onClick={history.goBack} title="Back">
      <ArrowBackIcon />
    </button>
  </Control>
);

export default BackControl;
