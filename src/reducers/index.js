import { combineReducers } from 'redux'
import { GAMES_LOADED, DOWNLOAD_BGG_PLAYS, FETCH_DB_PLAYS, SET_BGG_USERNAME, SORT_GAMES, FILTER_GAMES, SEARCH_BGG } from '../actions'
import moment from 'moment'

function filterGames(state = { byParams: { minBggRating: '', numPlayers: '', maxTime: '' } }, action){
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
  // console.log(action.payload, "action.payload from the REDUCER");
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

// (3)
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

      for (let j = 0; j < playsByGame.length; j++){

      }
      //2) SORT into most play order
      playsByGame.sort(function(a, b) {
        return b.totalplays - a.totalplays
      })

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

//, byDate: []
function allPlays(state = { all: [] }, action) {
  switch (action.type) {
    case FETCH_DB_PLAYS:
    console.log("PAYLOAD BEFORE PROCESSESING==========NEEDS TO BE ORDERED BY DATE", action.payload);

      //
      // //***** BY DATE *****

      //1) turn dates into sortable numbers
      const numberDates = action.payload.plays.map((el, i) => {
        return {...el, played_on: moment(el.played_on).format('YYYYMMDD')}

      })
      console.log(numberDates, "####NUMBER dates, no hyphen?");

      // 2) SORT
      const sortedPlays =
      action.payload.plays.sort(function(a, b){
        return b.played_on - a.played_on
      })
      console.log(sortedPlays, "??SORTED?? PLAYS");

      // // 3) group dates
      // const playsByDate = []
      // for (let i = 0; i < action.payload.plays.length; i++) {
      //   let prevdate
      //   if(i >= 1){
      //     prevdate = action.payload.plays[i-1].played_on
      //   } else if(i < 1) {
      //     prevdate = ''
      //   }
      //   let date = action.payload.plays[i].played_on
      //
      //   let dateGroup = { date: '', plays: []}
      //   if(date !== prevdate){
      //     dateGroup.date = date
      //     playsByDate.push(dateGroup)
      //   }
      // }
      // console.log(playsByDate, "playsByDate#########");


      //
      // // 4) add nested game name and comments
      // for (let j = 0; j < action.payload.length; j++) {
      //   let date = action.payload[j].$.date
      //   let gamename = action.payload[j].item[0].$.name
      //   let comments
      //   if(action.payload[j].comments){
      //     comments = action.payload[j].comments
      //   } else {
      //     comments = ''
      //   }
      //   let playid = action.payload[j].$.id
      //
      //   for (let k = 0; k < playsByDate.length; k++){
      //
      //     if(date === playsByDate[k].date){
      //       playsByDate[k].plays.push({playid, gamename, comments})
      //     }
      //   }
      // }

      return {
        ...state,
        all: action.payload
        // byDate: [...state.byDate, ...playsByDate]
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
  gameCollection, allPlays, currentUser, sortGames, filterGames, bggSearchResults
})
