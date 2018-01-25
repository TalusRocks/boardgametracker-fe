import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchGameCollection } from '../actions'
import GameStatsHeader from '../components/games/GameStatsHeader'
import FilterGamesButton from '../components/games/FilterGamesButton'
import Game from '../components/games/Game'


const GameCollection = ({ username, gameCollection, fetchGameCollection }) => {
  // console.log("gameCollection", gameCollection);
  return (
      <div>
        <div className="games-container">
          <GameStatsHeader/>
          <Game />
        </div>
        <FilterGamesButton/>
      </div>
    )
}

const mapStateToProps = state => ({
  gameCollection: state.gameCollection,
  username: state.currentUser.username
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchGameCollection }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameCollection)
