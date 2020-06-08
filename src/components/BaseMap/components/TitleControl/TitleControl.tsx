import React from 'react';
import Control from 'react-leaflet-control';

interface TitleControlProps {
  title: string;
}

export const TitleControl: React.FC<TitleControlProps> = (props: TitleControlProps) => (
  <Control position="topright">
    <div>
      <h2>{props.title}</h2>
    </div>
  </Control>
);

export default TitleControl;
