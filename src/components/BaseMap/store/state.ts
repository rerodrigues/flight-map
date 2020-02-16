import { LatLngTuple } from 'leaflet';

export interface MapState {
  center: LatLngTuple;
  zoom: number;
}

export const mapDefaultState: MapState = {
  center: [-15.7801, -47.9292],
  zoom: 5,
};
