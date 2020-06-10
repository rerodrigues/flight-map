/* eslint-disable @typescript-eslint/ban-ts-ignore */
import L, { Curve as LeafleCurve, PathOptions } from 'leaflet';
import '@elfalem/leaflet-curve';

import { Path, LatLng, PathProps, withLeaflet, LeafletContext } from 'react-leaflet';

type LeafletElement = LeafleCurve;

export type CurveProps = {
  positions: LatLng[] | LatLng[][];
  options: PathOptions;
} & PathProps &
  LeafletContext;

export class Curve extends Path<CurveProps, LeafletElement> {
  createLeafletElement(props: CurveProps): LeafletElement {
    const { positions } = props;
    return L.curve(positions, this.getOptions(props));
  }

  updateLeafletElement(fromProps: CurveProps, toProps: CurveProps): void {
    if (toProps.positions !== fromProps.positions) {
      // @ts-ignore
      this.leafletElement.setPath(toProps.positions);
    }
    this.setStyleIfChanged(fromProps, toProps);
  }
}

export default withLeaflet(Curve);
