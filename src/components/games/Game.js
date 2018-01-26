import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sortGameCollection } from '../../actions'
import GameStats from './GameStats'
import GameComment from './GameComment'
const orderBy = require('lodash.orderby');

const Game = ({ gameCollection, sortGames }) => {
  console.log(gameCollection.all, "gameCollection.all from Game.js");
  console.log(sortGames, "sortGames from Game.js");

  // gameCollection.all.map((el, i) => {
  //   console.log(el.stats[0].rating[0].average[0].$.value);
  // })



  //how does this fire? it needs to fire when header is clicked.
  //on header click, fire this?

  const result = orderBy(gameCollection.all,  ['stats[0].rating[0].average[0].$.value'], ['desc'])

  //map over collection by default
  //map over result IF what?  if a value in SortGames? once there's one value, there'll always be a value until it's refreshed



  return (

    <div className="one-game-container">
      { result.map((el, i) => {
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
