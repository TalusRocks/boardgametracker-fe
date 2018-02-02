import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sortGameCollection } from '../../actions'
import GameStats from './GameStats'
import GameComment from './GameComment'
const orderBy = require('lodash.orderby')
const at = require('lodash.at')

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


  let displayGames = gameCollection.all

  if(filterGames.byParams.minBggRating){
    displayGames = displayGames.filter(el => {

      return parseInt(el.stats[0].rating[0].average[0].$.value) >= parseInt(filterGames.byParams.minBggRating)
    })
  }

  if(filterGames.byParams.numPlayers){
    //NUMBER OF PLAYERS
    displayGames = displayGames.filter(el => {
      let bggminplayers = el.stats[0].$.minplayers
      let bggmaxplayers = el.stats[0].$.maxplayers
      if(!bggminplayers) bggminplayers = "1"
      if(!bggmaxplayers) bggmaxplayers = bggminplayers

      return parseInt(bggminplayers) <=  parseInt(filterGames.byParams.numPlayers) && parseInt(bggmaxplayers) <=  parseInt(filterGames.byParams.numPlayers)
    })
  }

  if(filterGames.byParams.maxTime){
    //MAX TIME
    displayGames = displayGames.filter(el => {
      return parseInt(el.stats[0].$.maxplaytime) <= parseInt(filterGames.byParams.maxTime)
    })
  }


  //SORT GAMES
  const result = orderBy(gameCollection.all, (game) => {
      return parseInt(at(game, param))
  }, [sortGames.byOptions.direction])

  //either display sorted games or default
  sortGames.byOptions.key ? (displayGames = result) : displayGames


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
