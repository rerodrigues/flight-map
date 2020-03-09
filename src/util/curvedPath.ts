import { LatLngTuple } from 'leaflet';

const curvedPath: any = (startPoint: LatLngTuple, endPoint: LatLngTuple) => {
  const offsetX = endPoint[1] - startPoint[1];
  const offsetY = endPoint[0] - startPoint[0];

  const r = Math.sqrt(offsetX ** 2 + offsetY ** 2);
  const theta = Math.atan2(offsetY, offsetX);
  const thetaOffset = 3.14 / 10;

  const r2 = r / 2 / Math.cos(thetaOffset);
  const theta2 = theta + thetaOffset;

  const midpointX = r2 * Math.cos(theta2) + startPoint[1];
  const midpointY = r2 * Math.sin(theta2) + startPoint[0];
  const midpointLatLng = [midpointY, midpointX];

  return [startPoint, midpointLatLng, endPoint];
};

export default curvedPath;
