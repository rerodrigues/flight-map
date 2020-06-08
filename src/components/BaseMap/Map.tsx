import React, { Component } from 'react';
import { Map, MapProps, TileLayer } from 'react-leaflet';

import { BackControl, HomeControl } from './components';
import { MapState, mapDefaultState } from './store';

type BaseMapProps = MapProps;

export default class BaseMap extends Component<BaseMapProps, MapState> {
  state = { ...mapDefaultState };

  render(): JSX.Element {
    const { state, props } = this;
    const { bounds, boundsOptions, center = state.center } = props;
    return (
      <Map center={center} zoom={state.zoom} zoomcontrol={false} bounds={bounds} boundsOptions={boundsOptions}>
        <TileLayer attribution="" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <BackControl />
        <HomeControl />
        {props.children}
      </Map>
    );
  }
}
