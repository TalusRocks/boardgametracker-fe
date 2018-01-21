import { combineReducers } from 'redux'
import { GAMES_LOADED } from '../actions'

function getGameCollection(state = { all: [] }, action) {

  switch (action.type) {
    case GAMES_LOADED:
      return {
        ...state,
        all: action.gameCollection
      }
    default:
      return state
  }

}



export default combineReducers({
  getGameCollection
})
