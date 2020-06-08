import React, { useState } from 'react';
import { Map, MapProps, TileLayer } from 'react-leaflet';

import { BackControl, HomeControl, ZoomControl } from './components';
import { mapDefaultState } from './store';

type BaseMapProps = MapProps;

export const BaseMap: React.FC<BaseMapProps> = (props: BaseMapProps) => {
  const [state] = useState(mapDefaultState);
  const { center = state.center } = props;

  return (
    <Map {...props} zoomControl={false} zoom={state.zoom} center={center}>
      <TileLayer attribution="" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ZoomControl />
      <HomeControl />
      <BackControl />
      {props.children}
    </Map>
  );
};

export default BaseMap;
