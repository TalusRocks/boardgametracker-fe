import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sortGameCollection } from '../../actions'
import GameStats from './GameStats'
import GameComment from './GameComment'
const orderBy = require('lodash.orderby');

const Game = ({ gameCollection, sortGames }) => {
  console.log(gameCollection.all, "gameCollection.all from Game.js");
  console.log(sortGames.byOptions.key, "sortGames.byOptions.key from Game.js");

  let displayGames

  const result = orderBy(gameCollection.all,  ['stats[0].rating[0].average[0].$.value'], ['desc'])
  console.log(result, "result");

  sortGames.byOptions.key ? (displayGames = result) : (displayGames = gameCollection.all)


  return (

    <div className="one-game-container">
      { displayGames.map((el, i) => {
        return (
          <div key={`game-${i}`}>
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
  gameCollection: state.gameCollection,
  sortGames: state.sortGames
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ sortGameCollection }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
