/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react';
// @ts-ignore
import { Curve } from 'react-leaflet-curve';
import { LatLngTuple } from 'leaflet';
import { withLeaflet } from 'react-leaflet';

import { curvedPath } from '../../../../util';

const WrappedCurve = withLeaflet(Curve);

export type RoutesMap = Map<string, LatLngTuple[]>;
interface FlightRouteProps {
  routes: RoutesMap;
}

const FlightRoute: React.FC<FlightRouteProps> = ({ routes }: FlightRouteProps) => {
  return (
    <>
      {Array.from(routes)
        .filter(route => route[1])
        .map(([key, [departureCoords, arrivalCoords]]) => {
          const [M, Q, endPoint] = curvedPath(departureCoords, arrivalCoords);
          const positions = ['M', M, 'Q', Q, endPoint];
          const options = { color: '#ae044d', weight: 2, opacity: 0.6, dashArray: [3, 6] };
          // @ts-ignore // I need this because Leafleat.curve is a legacy plugin
          return <WrappedCurve positions={positions} key={key} option={options} />;
        })}
    </>
  );
};

export default FlightRoute;
