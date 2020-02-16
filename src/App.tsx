import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';

import { Flights, Airports } from './components';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/airports" component={Airports} />
          <Route exact path="/airports/country/:countryId" component={Airports} />
          <Route exact path="/flights" component={Flights} />
          <Route exact path="/flights/company/:companyCode" component={Flights} />
          <Route exact path="/flights/airport/:icaoCode" component={Flights} />
          <Route
            exact
            path="/"
            render={() => (
              <>
                <h1>Welcome</h1>
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
              </>
            )}
          />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
