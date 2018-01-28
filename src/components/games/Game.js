import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sortGameCollection } from '../../actions'
import GameStats from './GameStats'
import GameComment from './GameComment'
const orderBy = require('lodash.orderby')

//used with ORDERBY 
const identity = require('lodash.identity')

const Game = ({ gameCollection, sortGames, filterGames }) => {

  let param

  switch (sortGames.byOptions.key) {
    case '':
      param = ''
      break
    case 'bggRating':
      param = 'stats[0].rating[0].average[0].$.value'
      break
    case 'yourRating':
      param = 'stats[0].rating[0].$.value'
      break
    case 'minPlayer':
      param = 'stats[0].$.minplayers'
      break
    case 'maxPlayer':
      param = 'stats[0].$.maxplayers'
      break
    case 'minTime':
      param = 'stats[0].$.minplaytime'
      break
    case 'maxTime':
      param = 'stats[0].$.maxplaytime'
      break
    default:
      param = ''
      break
  }

  // console.log(gameCollection.all, "gameCollection.all from Game.js");
  // console.log(sortGames.byOptions.key, "sortGames.byOptions.key from Game.js");
  // console.log(filterGames.byParams.maxTime, "filterGames from staaaaaate");

  //***need to move this so it doesn't fire on load?

  const filtered = gameCollection.all.filter(el => {
    return parseInt(el.stats[0].$.maxplaytime) < parseInt(filterGames.byParams.maxTime)
  })
  console.log(filtered, "filtered");





  //if there are filter options in redux, then filter the redux gameCollection and store the filtered games in redux state (?)... and when sorting, IF there are filtered games, sort through the _filtered_ games. Otherwise sort through the gamesColl.

  //reset the filter options from here with a button. Fire off filterGames with everything set to empty.


  let displayGames

  //SORT GAMES
  const result = orderBy(gameCollection.all, [param], [sortGames.byOptions.direction])
  // console.log(result, "result");

  //either display sorted games or default
  sortGames.byOptions.key ? (displayGames = result) : (displayGames = gameCollection.all)

  // filtered.length > 0 ? displayGames = filtered : (displayGames = gameCollection.all)



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
  sortGames: state.sortGames,
  filterGames: state.filterGames
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ sortGameCollection }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
