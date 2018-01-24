import { combineReducers } from 'redux'
import { GAMES_LOADED, PLAYS_LOADED, SET_BGG_USERNAME } from '../actions'

// (3)
function gameCollection(state = { all: [] }, action) {
  // is this really different from the allPlays payload?
  // console.log(action.payload, "GAAAAAME payload");
  switch (action.type) {
    case GAMES_LOADED:

      // 1) get game and total plays
      const playsByGame = []
      for (let i = 0; i < action.payload.length; i++){
        // let gamename

        let gamePlays = { gamename: '', totalplays: 0 }
      }

      // 2) nest plays, listing dates played


      return {
        ...state,
        all: action.payload
      }
    default:
      return state
  }
}

function allPlays(state = { all: [], byDate: [] }, action) {
  switch (action.type) {
    case PLAYS_LOADED:
    console.log("PAYLOAD BEFORE PROCESSESING==========", action.payload);
      // const byDate = action.payload.reduce(function(acc, el){
      //   const date = el.$.date
      //   acc[date] = acc[date] || []
      //   acc[date].push({ name: el.item[0].$.name,
      //   comments: el.comments ? el.comments[0] : '' })
      //   return acc
      // }, {})

      //***** BY DATE *****
      // 1) group dates
      const playsByDate = []
      for (let i = 0; i < action.payload.length; i++) {
        let prevdate
        if(i >= 1){
          prevdate = action.payload[i-1].$.date
        } else if(i < 1) {
          prevdate = ''
        }
        let date = action.payload[i].$.date

        let dateGroup = { date: '', plays: []}
        if(date !== prevdate){
          dateGroup.date = date
          playsByDate.push(dateGroup)
        }
      }

      // 2) add nested game name and comments
      for (let j = 0; j < action.payload.length; j++) {
        let date = action.payload[j].$.date
        let gamename = action.payload[j].item[0].$.name
        let comments
        if(action.payload[j].comments){
          comments = action.payload[j].comments
        } else {
          comments = ''
        }
        let playid = action.payload[j].$.id

        for (let k = 0; k < playsByDate.length; k++){

          if(date === playsByDate[k].date){
            playsByDate[k].plays.push({playid, gamename, comments})
          }
        }

      }
      console.log(action.payload, "PLAYYYY payload");

      return {
        ...state,
        all: action.payload,
        byDate: [...state.byDate, ...playsByDate]
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
  gameCollection, allPlays, currentUser
})

// in expanded form, object key can be whatever-
// but that's what you'll call after state in App.js
// e.g. gameCollection: state.banana (in mapStateToProps)
// export default combineReducers({
//   banana: gameCollection
// })
