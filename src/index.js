import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import './index.css'
import './css/navigation.css'
import './css/plays.css'
import './css/games.css'
import './css/forms.css'
import './css/buttons.css'
import './css/statcolors.css'
import './css/mediaqueries.css'

import store from './store'
import { Provider } from 'react-redux'
import { fetchGameCollection, fetchDbPlays, calculatePlaysPerGame } from './actions'

//*using local storage for development purposes
let bggusername = localStorage.getItem('bggusername')
if(bggusername){
  store.dispatch(fetchGameCollection())
  //***** add a check here
  store.dispatch(fetchDbPlays())
  store.dispatch(calculatePlaysPerGame())
}


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
