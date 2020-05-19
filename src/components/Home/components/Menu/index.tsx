import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => (
  <dl>
    <dt>Airports</dt>
    <dd>
      <Link to="/airports">All airports</Link>
    </dd>
    <dd>
      <Link to="/airports/country/brazil">Airports in Brazil</Link>
    </dd>
    <dd>
      <Link to="/airports/country/spain">Airports in Spain</Link>
    </dd>
    <dd>
      <Link to="/airport/sbbr">SBBR Airport Flights</Link>
    </dd>
    <dt>Flights</dt>
    <dd>
      <Link to="/flights/">All flights</Link>
    </dd>
    <dd>
      <Link to="/flights/company/aal">American Ariline flights</Link>
    </dd>
    <dd>
      <Link to="/flights/company/azu">Azul flights</Link>
    </dd>
    <dd>
      <Link to="/flights/airport/kmia">KMIA Airport Flights</Link>
    </dd>
  </dl>
);

export default Menu;
