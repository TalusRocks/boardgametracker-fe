import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import GameCollection from './components/GameCollection'
import Navigation from './components/shared/Navigation'
import './App.css';
import { connect } from 'react-redux'

const App = ( { gameCollection }) => (
  // ( gameCollection ) ? (
    <Router>
      <div>

        <Route exact path='/' component={ (props) =>
          <div>
          <Navigation/>
          <GameCollection {...props}
        gameCollection={ gameCollection }/>
          </div>
        }/>

      </div>
    </Router>
  // ) : (<div>Loading...</div>)

)

//KEYS should be the name of REDUCER functions
//if Reducer is foo then VALUE here is state.foo
//to access data 'bar' (nested in state), use this.props.foo.bar
const mapStateToProps = state => ({
  gameCollection: state.gameCollection
})

const mapDispatchToProps = state => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
