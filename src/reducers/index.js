import { combineReducers } from 'redux'
import { GAMES_LOADED, PLAYS_LOADED, SET_BGG_USERNAME } from '../actions'

// (3)
function gameCollection(state = { all: [] }, action) {
  switch (action.type) {
    case GAMES_LOADED:
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

      const byDate = action.payload.reduce(function(acc, el){
        const date = el.$.date
        acc[date] = acc[date] || []
        acc[date].push({ name: el.item[0].$.name,
        comments: el.comments ? el.comments[0] : '' })
        return acc
      }, {})

      console.log(byDate, "byDate!!!!!!");

      return {
        ...state,
        all: action.payload,
        // byDate
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
