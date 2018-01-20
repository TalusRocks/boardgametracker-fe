export const GAMES_LOADED = 'GAMES_LOADED'

export function fetchGameCollection(){
  return async (dispatch) => {
    const response = await fetch('http://localhost:3000/games')
    const json = await response.json()
    dispatch({
      type: GAMES_LOADED,
      gameCollection: json.games
    })
  }
}
