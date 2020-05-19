/* eslint-disable import/no-cycle */
import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import reducers from './reducers';
import sagas from './sagas';

export const history = createBrowserHistory();

const composeEnhancers = composeWithDevTools({});

const sagaMiddleware = createSagaMiddleware();
const connectedRouterMiddleware = routerMiddleware(history);
const middlewares = applyMiddleware(sagaMiddleware, connectedRouterMiddleware);

export const rootReducers = combineReducers({
  ...reducers,
  router: connectRouter(history),
});

export const store = createStore(rootReducers, composeEnhancers(middlewares));

sagas.forEach(sagaMiddleware.run);

export type AppState = ReturnType<typeof rootReducers>;
