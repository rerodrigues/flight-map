import React from 'react';
import Control from 'react-leaflet-control';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useLeaflet } from 'react-leaflet';
import * as styles from './styles';

export const ZoomControl: React.FC = () => {
  const { map } = useLeaflet();
  const classes = styles.zoomControl();

  return (
    <Control position="topleft">
      <div className={classes.root}>
        <button type="button" onClick={() => map && map.zoomIn()} title="Zoom In">
          <AddIcon />
        </button>
        <button type="button" onClick={() => map && map.zoomOut()} title="Zoom">
          <RemoveIcon />
        </button>
      </div>
    </Control>
  );
};

export default ZoomControl;
