export const GAMES_LOADED = 'GAMES_LOADED'
export const PLAYS_LOADED = 'PLAYS_LOADED'
export const SET_BGG_USERNAME = 'SET_BGG_USERNAME'

//https://github.com/Leonidas-from-XIV/node-xml2js
var parseString = require('xml2js').parseString;

//DEMO:
// var xml = "<root>Hello xml2js!</root>"
// parseString(xml, function (err, result) {
//     console.log(result, "PARSED");
//     console.log(JSON.stringify(result), "STRINGified");
// });


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
    // let bggusername = getState().currentUser.username

    let bggusername = localStorage.getItem('bggusername')
    //****To do - add gameCollection length to 'if'
    if(bggusername){
        const data = await fetch(`https://www.boardgamegeek.com/xmlapi2/collection?username=${bggusername}&own=1`)
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
    const playData = await fetch('https://www.boardgamegeek.com/xmlapi2/plays?username=PlayBosco')
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))

    parseString(`<AllPlays>${playData.documentElement.innerHTML}</AllPlays>`, {trim: true}, function (err, result){

      dispatch({
        type: PLAYS_LOADED,
        payload: result.AllPlays.play
      })

    })
  }
}
