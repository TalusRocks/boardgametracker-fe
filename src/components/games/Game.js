import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GameStats from './GameStats'
import GameText from './GameText'
import GameComment from './GameComment'

const Game = ({ gameCollection }) => {
  return (
    <div className="one-game-container">
      <GameText/>
      <GameStats/>
    </div>
  )
}

const mapStateToProps = state => ({
  gameCollection: state.gameCollection
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
