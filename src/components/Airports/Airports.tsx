import React, { useEffect } from 'react';
import { LayerGroup } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import BaseMap, { TitleControl } from '../BaseMap';
import { Airport } from '../../services/airports/types';
import { AirportMarker } from './components';
import { AirportsParams, filterAirportsStart, selectFilteredAirportData } from './store';
import { history } from '../../store';
import { useSelector } from '../../util';

interface LoadAirportsParams {
  params: AirportsParams;
}

export type AirportsProps = React.HTMLAttributes<HTMLElement>;

const handleMarkerClick = (airport: Airport): void => {
  history.push(`/airport/${airport.icao.toLowerCase()}`);
};

export const Airports: React.FC<AirportsProps> = () => {
  const dispatch = useDispatch();
  const { params }: LoadAirportsParams = useRouteMatch();

  useEffect(() => {
    dispatch(filterAirportsStart({ countryId: params.countryId }));
  }, [dispatch, params.countryId]);

  const airports = useSelector(selectFilteredAirportData);

  return (
    <BaseMap>
      {params.countryId && <TitleControl title={`Airports in ${params.countryId.toUpperCase()}`} />}

      <LayerGroup>
        {airports.map((airport: Airport) => (
          <AirportMarker airport={airport} key={airport.icao} onClick={handleMarkerClick} />
        ))}
      </LayerGroup>
    </BaseMap>
  );
};

export default Airports;
