import { Icon } from 'leaflet';

const SelectedAirportIcon = new Icon({
  iconUrl: '/img/tower.png',
  iconSize: [64, 64],
  iconAnchor: [32, 64],
  popupAnchor: [0, -74],
});

export default SelectedAirportIcon;
