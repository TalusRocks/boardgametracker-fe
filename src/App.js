import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import GameCollection from './containers/GameCollection'
import AllPlaysContainer from './containers/AllPlaysContainer'
import AddPlayForm from './containers/AddPlayForm'
import TopNavigationBar from './components/shared/TopNavigationBar'
import BottomMobileNav from './components/shared/BottomMobileNav'
import './App.css';

import { connect } from 'react-redux'

const App = ( { gameCollection, allPlays }) => (
  // ( gameCollection ) ? (
    <Router>
      <div>

        <Route exact path='/plays' component={ props =>
          <div>
            <TopNavigationBar/>
            <AllPlaysContainer {...props}
            allPlays={ allPlays }/>
            <BottomMobileNav/>
          </div>
        }/>

        <Route path='/plays/addplay' component={ props =>
          <AddPlayForm/>
        }/>

        <Route path='/games' component={ props =>
          <div>
          <TopNavigationBar/>
          <GameCollection {...props}
        gameCollection={ gameCollection }/>
          <BottomMobileNav/>
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
  gameCollection: state.gameCollection,
  allPlays: state.allPlays
})

const mapDispatchToProps = state => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
