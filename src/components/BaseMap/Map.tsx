import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { mapDefaultState, MapState } from './store';
import { BackControl, HomeControl } from './components';

export default class BaseMap extends Component<{}, MapState> {
  state = { ...mapDefaultState };

  render(): JSX.Element {
    const { state, props } = this;
    return (
      <Map center={state.center} zoom={state.zoom} zoomcontrol={false}>
        <TileLayer attribution="" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <BackControl />
        <HomeControl />
        {props.children}
      </Map>
    );
  }
}
