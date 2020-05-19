import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import reducers from './reducers';
// import sagas from './sagas';

const composeEnhancers = composeWithDevTools({});

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const connectedRouterMiddleware = routerMiddleware(history);
const middlewares = applyMiddleware(sagaMiddleware, connectedRouterMiddleware);

const rootReducers = combineReducers({
  ...reducers,
  router: connectRouter(history),
});

// sagas.forEach(sagaMiddleware.run);

export type AppState = ReturnType<typeof rootReducers>;

export default createStore(rootReducers, composeEnhancers(middlewares));
