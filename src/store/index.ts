import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducers from './reducers';
// import sagas from './sagas';

const composeEnhancers = composeWithDevTools({});

const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware);

const rootReducers = combineReducers({
  ...reducers,
});

// sagas.forEach(sagaMiddleware.run);

export type AppState = ReturnType<typeof rootReducers>;

export default createStore(rootReducers, composeEnhancers(middlewares));
