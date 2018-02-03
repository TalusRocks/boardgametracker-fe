import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Welcome from './components/Welcome'
import GameCollection from './containers/GameCollection'
import AllPlaysContainer from './containers/AllPlaysContainer'
import PlayStatsContainer from './containers/PlayStatsContainer'
import AddPlayForm from './containers/AddPlayForm'
import FilterGamesForm from './containers/FilterGamesForm'
import TopNavigationBar from './components/shared/TopNavigationBar'
import BottomMobileNav from './components/shared/BottomMobileNav'
import TopMobilePlayNav from './components/shared/TopMobilePlayNav'
import './App.css';

import { connect } from 'react-redux'

const App = ( { gameCollection, allPlays }) => (

    <Router>
      <div>

        <Route exact path='/' component={ props => <Welcome/>}/>

        <Route exact path='/plays' component={ props =>
          <div>
            <TopNavigationBar/>
            {/* <TopMobilePlayNav/> */}
            <AllPlaysContainer {...props}
            allPlays={ allPlays }/>
            <BottomMobileNav/>
          </div>
        }/>

        <Route exact path='/plays/stats' component={ props =>
          <div>
            <TopNavigationBar/>
            <TopMobilePlayNav/>
            <PlayStatsContainer/>
            <BottomMobileNav/>
          </div>

        }/>

        <Route exact path='/plays/addplay' component={ props =>
          <AddPlayForm/>
        }/>

        <Route exact path='/games' component={ props =>
          <div>
          <TopNavigationBar/>
          <GameCollection {...props} gameCollection={ gameCollection }/>
          <BottomMobileNav/>
          </div>
        }/>

        <Route exact path='/games/filtergames' component={ props =>
          <FilterGamesForm/>
        }/>

      </div>
    </Router>

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
