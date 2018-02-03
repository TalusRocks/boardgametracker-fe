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

      return parseInt(el.stats[0].rating[0].average[0].$.value, 10) >= parseInt(filterGames.byParams.minBggRating, 10)
    })
  }

  if(filterGames.byParams.numPlayers){
    //NUMBER OF PLAYERS
    displayGames = displayGames.filter(el => {
      let bggminplayers = el.stats[0].$.minplayers
      let bggmaxplayers = el.stats[0].$.maxplayers
      if(!bggminplayers) bggminplayers = "1"
      if(!bggmaxplayers) bggmaxplayers = bggminplayers

      return parseInt(bggminplayers, 10) <=  parseInt(filterGames.byParams.numPlayers, 10) && parseInt(bggmaxplayers, 10) >=  parseInt(filterGames.byParams.numPlayers, 10)
    })
  }

  if(filterGames.byParams.minTime){
    //MIN TIME
    displayGames = displayGames.filter(el => {
      console.log(el.stats[0].$.minplaytime);
      return parseInt(el.stats[0].$.minplaytime, 10) >= parseInt(filterGames.byParams.minTime, 10)
    })
  }

  if(filterGames.byParams.maxTime){
    //MAX TIME
    displayGames = displayGames.filter(el => {
      return parseInt(el.stats[0].$.maxplaytime, 10) <= parseInt(filterGames.byParams.maxTime, 10)
    })
  }


  //SORT GAMES
  const result = orderBy(displayGames, (game) => {
      return parseFloat(at(game, param))
  }, [sortGames.byOptions.direction])

  //either display sorted games or default
  sortGames.byOptions.key ? (displayGames = result) : displayGames


  return (

    <div>
      { displayGames.map((el, i) => {
        return (
          <div className="mtb-2" key={`game-${i}`}>
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
