import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import GameCollection from './components/GameCollection'

import './App.css';

import { connect } from 'react-redux'

const App = ( { gameCollection }) => (
  // ( gameCollection ) ? (
    <Router>
      <div>
        <Route exact path='/' component={ (props) => <GameCollection {...props}
        gameCollection={ gameCollection }/> } />
      </div>
    </Router>
  // ) : (<div>Loading...</div>)

)

const mapStateToProps = state => ({
  gameCollection: state.gameCollection
})

const mapDispatchToProps = state => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
