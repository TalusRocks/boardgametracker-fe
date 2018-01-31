export const GAMES_LOADED = 'GAMES_LOADED'
export const DOWNLOAD_BGG_PLAYS = 'DOWNLOAD_BGG_PLAYS'
export const FETCH_DB_PLAYS = 'FETCH_DB_PLAYS'
export const SET_BGG_USERNAME = 'SET_BGG_USERNAME'
export const SORT_GAMES = 'SORT_GAMES'
export const FILTER_GAMES = 'FILTER_GAMES'
export const POST_PLAY = 'POST_PLAY'
export const SEARCH_BGG = 'SEARCH_BGG'

const baseURL = 'http://localhost:3000'

var parseString = require('xml2js').parseString;

export function filterGameCollection(filterParams){
  return {
    type: FILTER_GAMES,
    payload: filterParams
  }
}

export function sortGameCollection(sortKeyDir){
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

    let bggusername = localStorage.getItem('bggusername')
    //temporary holder for development:
    // let bggusername = 'PlayBosco'

    //****TO-DO: - add gameCollection length to 'if'
    if(bggusername){
        const data = await fetch(`https://www.boardgamegeek.com/xmlapi2/collection?username=${bggusername}&own=1&stats=1`)
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))

        parseString(`<GamesOwned>${data.documentElement.innerHTML}</GamesOwned>`, {trim: true}, function (err, result){
          //IF first time, POST to db *await
          dispatch({
            type: GAMES_LOADED,
            payload: result.GamesOwned.item
          })
        })
      }
    }
}


export function searchBoardGameGeek(searchParam){
  return async (dispatch) => {
    const data = await fetch(`https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${searchParam}`)
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))

    parseString(`<items>${data.documentElement.innerHTML}</items>`, {trim: true}, function (err, result){
      dispatch({
        type: SEARCH_BGG,
        payload: result.items.item
      })
    })
  }
}

export function postNewPlay(newPlayParams){
  return async(dispatch) => {
    const data = await fetch(`${baseURL}/plays`, {
      method: 'POST',
      body: JSON.stringify(newPlayParams),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })

    if(data.ok){
      dispatch({
        type: POST_PLAY,
        payload: newPlayParams
      })
    } else {
      console.log("add error handling...");
    }

  }

}

export function fetchDbPlays(){
  return async(dispatch) => {
    const data = await fetch(`${baseURL}/plays`)
    const json = await data.json()

    dispatch({
      type: FETCH_DB_PLAYS,
      payload: json
    })
  }
}


export function downloadPlays(){
  console.log("hello from downloadPlays");
  return async (dispatch) => {
    //TO DO
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

      parseString(`<AllPlays>${playData.documentElement.innerHTML}</AllPlays>`, {trim: true}, async function (err, result){

        const playsForDb = result.AllPlays.play.map((el, i) => {
          // console.log(el, "--!GET BGG DATA FOR THE DB HERE!--");
          return {
            // play_id:
            played_on: el.$.date,
            bgg_game_id: el.item[0].$.objectid,
            game_name: el.item[0].$.name,
            comment: el.comments ? el.comments[0] : '' }
        })
        const data = await fetch(`${baseURL}/plays`, {
          method: 'POST',
          body: JSON.stringify(playsForDb),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
        // const json = await data.json()

        // if(result.AllPlays.play.length < 100) going = false
        dispatch(fetchDbPlays())
      })

      // console.log(page, "page");
      // page += 1
      // await fetchPlays()

    // }
  }
}
