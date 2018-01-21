import { combineReducers } from 'redux'
import { GAMES_LOADED } from '../actions'

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



export default combineReducers({
  gameCollection
})
