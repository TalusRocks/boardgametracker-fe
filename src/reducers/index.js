import { combineReducers } from 'redux'
import { GAMES_LOADED, FETCH_DB_PLAYS, SET_BGG_USERNAME, SORT_GAMES, FILTER_GAMES, SEARCH_BGG, POST_PLAY, PLAYS_PER_GAME } from '../actions'
import moment from 'moment'

function filterGames(state = { byParams: { minBggRating: '', numPlayers: '', minTime: '', maxTime: '' } }, action){
  switch (action.type) {
    case FILTER_GAMES:
      return {
        ...state,
        byParams: action.payload
      }
    default:
      return state
  }
}

function sortGames(state = { byOptions: { key: '', direction: '' }
  }, action){
  switch (action.type) {
    case SORT_GAMES:
      return {
        ...state,
        byOptions: action.payload
      }
    default:
      return state
  }
}

function playsPerGame(state = { all: [] }, action){
  switch (action.type) {
    case PLAYS_PER_GAME:

    // const match = plays.find(play => play.date === singlePlay.date)
      console.log(action.payload.plays);
      const talliedPlaysPerGame = []
      for (let i = 0; i < action.payload.plays.length; i++) {

        //if the play has already been pushed to tallied...
        if (talliedPlaysPerGame.find(el => el.bgg_game_id === action.payload.plays[i].bgg_game_id)){

          //find it (again- doh!) and increase total plays by 1
          for(let j = 0; j < talliedPlaysPerGame.length; j++){
            if(talliedPlaysPerGame[j].bgg_game_id === action.payload.plays[i].bgg_game_id){
              talliedPlaysPerGame[j].totalplays = talliedPlaysPerGame[j].totalplays + 1
            }
          }

        } else {

          //otherwise, add to new array in right format (with total of 1)
          talliedPlaysPerGame.push(
            {
              game_name: action.payload.plays[i].game_name,
              bgg_game_id: action.payload.plays[i].bgg_game_id,
              totalplays: 1
            }
          )
        }

      }

      talliedPlaysPerGame.sort(function(a, b) {
        return b.totalplays - a.totalplays
      })

      return {
        ...state,
        all: talliedPlaysPerGame
      }
    default:
      return state
  }
}

function gameCollection(state = { all: [], byPlays: [] }, action) {
  switch (action.type) {
    case GAMES_LOADED:
      // 1) get game and total plays
      const playsByGame = []
      for (let i = 0; i < action.payload.length; i++){

        let gamename = action.payload[i].name[0]._
        let gameid = action.payload[i].$.objectid
        let totalplays = action.payload[i].numplays[0]

        let gamePlays = { gamename, gameid, totalplays }
        playsByGame.push(gamePlays)
      }

      // 2) SORT into most played order
      playsByGame.sort(function(a, b) {
        return b.totalplays - a.totalplays
      })


      //fill in undefined stats
      for (let j = 0; j < action.payload.length; j++){
        //if no min time, set to 0
        if(!action.payload[j].stats[0].$.minplaytime){
          action.payload[j].stats[0].$.minplaytime = 0
        }
        //if no max time, set to min time
        if(!action.payload[j].stats[0].$.maxplaytime){
          action.payload[j].stats[0].$.maxplaytime = action.payload[j].stats[0].$.minplaytime
        }
        //if no max player, set to min player
        if(!action.payload[j].stats[0].$.maxplayers){
          action.payload[j].stats[0].$.maxplayers= action.payload[j].stats[0].$.minplayers
        }
      }
      console.log(action.payload, "action.payload");

      return {
        ...state,
        all: action.payload,
        byPlays: [...state.byPlays, ...playsByGame]
      }
    default:
      return state
  }
}

function bggSearchResults(state = { all: [] }, action) {
  switch (action.type) {
    case SEARCH_BGG:
      return {
        ...state,
        all: action.payload
      }
    default:
      return state
  }
}

function sortPlaysByDate(payload){
  // 1) turn dates into sortable numbers
  const formattedDates = payload.map((el, i) => {
    return {...el, played_on: moment(el.played_on).format('YYYYMMDD')}
  })

  // 2) SORT
  const sortedPlays =
  formattedDates.sort(function(a, b){
    return b.played_on - a.played_on
  })

  // 3) group dates
  const playsByDate = []
  for (let i = 0; i < sortedPlays.length; i++) {
    let prevdate
    if(i >= 1){
      prevdate = sortedPlays[i-1].played_on
    } else if(i < 1) {
      prevdate = ''
    }
    let date = sortedPlays[i].played_on

    let dateGroup = { date: '', plays: []}
    if(date !== prevdate){
      dateGroup.date = date
      playsByDate.push(dateGroup)
    }
  }

  // 4) add nested game name and comments
  for (let j = 0; j < payload.length; j++) {

    let date = payload[j].played_on
    let gamename = payload[j].game_name
    let comments
    if(payload[j].comment){
      comments = payload[j].comment
    } else {
      comments = ''
    }

    for (let k = 0; k < playsByDate.length; k++){
      if(moment(date).format('YYYYMMDD') === playsByDate[k].date){
        playsByDate[k].plays.push({gamename, comments})
      }
    }
  }

  return playsByDate
}

function allPlays(state = { byDate: [] }, action) {
  switch (action.type) {

    case FETCH_DB_PLAYS:
      const playsByDate = sortPlaysByDate(action.payload.plays)
      return {
        ...state,
        byDate: playsByDate
      }

    case POST_PLAY:
      //get into {date: '', plays: []} format
      const newPlayByDate = sortPlaysByDate([action.payload])

      //see if the new play needs to be nested in an existing date
      function insertNewPlay(plays, newPlay){
        const singlePlay = newPlay[0]
        const match = plays.find(play => play.date === singlePlay.date)

        if (match) {
          match.plays.unshift(singlePlay.plays[0])
          return plays
        } else {
          //or if it doesn't overlap a date,
          //then add as a new date,
          const allThePlays = [newPlay[0], ...plays]
          //then sort again to put in right spot
          allThePlays.sort(function(a, b){
            return b.date - a.date
          })
          return allThePlays
        }
      }

      const playsWithNewPost = insertNewPlay(state.byDate, newPlayByDate)

      return {
        ...state,
        byDate: playsWithNewPost
      }
    default:
      return state
  }
}


function currentUser(state = { username: '' }, action){
  switch (action.type) {
    case SET_BGG_USERNAME:
      return {
        ...state,
        username: action.payload
      }
    default:
      return state
  }
}


export default combineReducers({
  gameCollection, allPlays, currentUser, sortGames, filterGames, bggSearchResults, playsPerGame
})
