import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import './css/navigation.css';

import store from './store'
import { Provider } from 'react-redux'
import { fetchGameCollection } from './actions'



// (1)
store.dispatch(fetchGameCollection())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
