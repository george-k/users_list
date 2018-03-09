/* global window */
import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import * as mainReducers from './reducers/main';

import rootSaga from './sagas/main';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers(mainReducers),
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);
window.store = store;

export default store;
