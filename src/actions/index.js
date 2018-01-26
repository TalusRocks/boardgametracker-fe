export const GAMES_LOADED = 'GAMES_LOADED'
export const PLAYS_LOADED = 'PLAYS_LOADED'
export const SET_BGG_USERNAME = 'SET_BGG_USERNAME'
export const SORT_GAMES = 'SORT_GAMES'

var parseString = require('xml2js').parseString;

export function sortGameCollection(sortKeyDir){
  // console.log(sortKey, "sortKey from the ACTION sortGameCollection");
  return {
    type: SORT_GAMES,
    payload: sortKeyDir
  }
}

export function sendBGGUsername(bggusername){
  //********TO-DO: ping API to check username
  localStorage.setItem('bggusername', bggusername)
  return {
    type: SET_BGG_USERNAME,
    payload: bggusername
  }
}

export function fetchGameCollection(){
  return async (dispatch, getState) => {

    // let bggusername = localStorage.getItem('bggusername')
    //temporary holder for development:
    let bggusername = 'PlayBosco'

    //****To do - add gameCollection length to 'if'
    if(bggusername){
        const data = await fetch(`https://www.boardgamegeek.com/xmlapi2/collection?username=${bggusername}&own=1&stats=1`)
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))

        parseString(`<GamesOwned>${data.documentElement.innerHTML}</GamesOwned>`, {trim: true}, function (err, result){
          dispatch({
            type: GAMES_LOADED,
            payload: result.GamesOwned.item
          })
        })
      }
    }
}

export function fetchPlays(){
  return async (dispatch) => {
    //dispatch PLAYS_LOADING to make a spinner here
    //change PLAYS_LOADED to ADD_PLAYS
    // then PLAYS_LOADED (can have >1 dispatch)
    let page = 1

    //*** turn off getting all pages for development
    // let going = true
    //
    // while (going) {

      const playData = await fetch(`https://www.boardgamegeek.com/xmlapi2/plays?username=PlayBosco&page=${page}`)
      .then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))

      parseString(`<AllPlays>${playData.documentElement.innerHTML}</AllPlays>`, {trim: true}, function (err, result){

        // if(result.AllPlays.play.length < 100) going = false

        dispatch({
          type: PLAYS_LOADED,
          payload: result.AllPlays.play
        })

      })

      // console.log(page, "page");
      // page += 1
      // await fetchPlays()

    // }

  }
}
