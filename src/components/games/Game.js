import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GameStats from './GameStats'
import GameComment from './GameComment'

const Game = ({ gameCollection }) => {
  return (
    <div className="one-game-container">
      { gameCollection.all.map((el, i) => {
        return (
          <div>
            <h2 key={`${el.name}-${i}`} className="game-name">{el.name[0]._}</h2>
            <GameComment gameComment={el.comment ? el.comment : ''}/>
            <GameStats gameStats={el.stats}/>
          </div>
        )
      })}
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
