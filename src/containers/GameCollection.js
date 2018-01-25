import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchGameCollection } from '../actions'
import Game from '../components/games/Game'
import FilterGamesButton from '../components/games/FilterGamesButton'


const GameCollection = ({ username, gameCollection, fetchGameCollection }) => {
  console.log("gameCollection", gameCollection);
  return (
      <div>
        <div className="games-container">
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
