export const GAMES_LOADED = 'GAMES_LOADED'
export const PLAYS_PER_GAME = 'PLAYS_PER_GAME'
export const DOWNLOAD_BGG_PLAYS = 'DOWNLOAD_BGG_PLAYS'
export const FETCH_DB_PLAYS = 'FETCH_DB_PLAYS'
export const SET_BGG_USERNAME = 'SET_BGG_USERNAME'
export const SORT_GAMES = 'SORT_GAMES'
export const FILTER_GAMES = 'FILTER_GAMES'
export const POST_PLAY = 'POST_PLAY'
export const SEARCH_BGG = 'SEARCH_BGG'

const baseURL = process.env.REACT_APP_API_URL

var parseString = require('xml2js').parseString;

export function sendBGGUsername(bggusername){
  //TO-DO: ping BGG to check username
  localStorage.setItem('bggusername', bggusername)

  return {
    type: SET_BGG_USERNAME,
    payload: bggusername
  }
}

//TO-DO: Refactor! This is too long. Break apart.
export function downloadPlays(){

  return async (dispatch) => {
    //Wipe out DB before downloading BGG data
    //TO-DO: append data if not already downloaded from BGG
    await fetch(`${baseURL}/plays`, { method: 'DELETE' })

    let bggusername = localStorage.getItem('bggusername')
    let page = 1

    //TO-DO: If no response the first time, wait and try again
    const response = await fetch(`https://www.boardgamegeek.com/xmlapi2/plays?username=${bggusername}&page=${page}`)
    const xml = await response.text()
    const playData = new window.DOMParser().parseFromString(xml, "text/xml")
    //Get all pages of data
    let totalPlays = parseInt(playData.documentElement.getAttribute('total'))
    const remainingPages = Math.ceil(totalPlays / 100)
    //Creates an array of page numbers
    const pages = Array.from({ length: remainingPages }, (el, i) => i + 1)

    //Make an array of all requests
    const requests = pages.map((el, i) => {
      const url = `https://www.boardgamegeek.com/xmlapi2/plays?username=${bggusername}&page=${el}`
      //Requests will return this array of promises
      return new Promise((resolve, reject) => {
        //Delay to not attack the server
        setTimeout(() => {
          fetch(url)
            .then(response => response.text())
            .then(xml => new window.DOMParser().parseFromString(xml, "text/xml"))
            .then(result => resolve(result))
        }, i * 1000)
      })
    })

    //Resolve the promises, turning into fetches into xml data
    const remainingRequestData = await Promise.all(requests)
    //Combine the data into one big chunk
    const playsContent = remainingRequestData.reduce((acc, el) => {
      return acc + el.documentElement.innerHTML
    }, '')

    //Parse from xml into json
    parseString(`<AllPlays>${playsContent}</AllPlays>`, {trim: true}, async function (err, result){
      //Mold data into my format
      //TO-DO: can do this on the backend
      const playsForDb = result.AllPlays.play.map((el, i) => {
        //Temporary user_id for development
        return {
          user_id: 1,
          played_on: el.$.date,
          bgg_game_id: el.item[0].$.objectid,
          game_name: el.item[0].$.name,
          comment: el.comments ? el.comments[0] : '' }
      })

      //Post to database
      //TO-DO: chunk this out for extra large requests
      await fetch(`${baseURL}/plays`, {
        method: 'POST',
        body: JSON.stringify(playsForDb),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).catch(console.error)

      //Show to page
      dispatch(fetchDbPlays())
    })

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

export function fetchGameCollection(){
  return async (dispatch, getState) => {

    let bggusername = localStorage.getItem('bggusername')

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

export function calculatePlaysPerGame(){
  return async(dispatch) => {
    const data = await fetch(`${baseURL}/plays`)
    const json = await data.json()

    dispatch({
      type: PLAYS_PER_GAME,
      payload: json
    })
  }
}

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
