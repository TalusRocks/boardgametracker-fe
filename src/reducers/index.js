import { combineReducers } from 'redux'
import { GAMES_LOADED, PLAYS_LOADED } from '../actions'

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

function allPlays(state = { all: [] }, action) {

  switch (action.type) {
    case PLAYS_LOADED:
      return {
        ...state,
        all: action.payload
      }
    default:
      return state
  }

}



export default combineReducers({
  gameCollection, allPlays
})

// in expanded form, object key can be whatever-
// but that's what you'll call after state in App.js
// e.g. gameCollection: state.banana (in mapStateToProps)
// export default combineReducers({
//   banana: gameCollection
// })
