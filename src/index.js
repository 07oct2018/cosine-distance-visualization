import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers';
import initialState from './initialState.js';

const store = createStore( rootReducer);

const render = () => ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.querySelector('#root')
);

render();
