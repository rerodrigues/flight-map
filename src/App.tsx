import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';

import { Airports } from './components';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/airports" component={Airports} />
          <Route
            exact
            path="/"
            render={() => (
              <>
                <h1>Welcome</h1>
                <ul>
                  <li>
                    <Link to="/airports">Airports</Link>
                  </li>
                </ul>
              </>
            )}
          />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
