/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

import App from './components/App';


ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} path="/" />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
