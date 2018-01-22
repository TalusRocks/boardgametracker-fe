export const GAMES_LOADED = 'GAMES_LOADED'

//https://github.com/Leonidas-from-XIV/node-xml2js
// var parseString = require('xml2js').parseString;

//DEMO:
// var xml = "<root>Hello xml2js!</root>"
// parseString(xml, function (err, result) {
//     // console.log(JSON.stringify(result), "STRINGified");
//     // console.log(result, "PARSED");
// });

// export function fetchGameCollection(){
//   return async (dispatch) => {
//     const XMLresponse = await fetch('https://www.boardgamegeek.com/xmlapi2/plays?username=PlayBosco')
//     .then(response => response.text())
//     .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
//     .then(data => {
//       console.log(data, "data");
//       // parseString(data, function (err, result){
//       //   console.log(result);
//       // })
//     })
//
//     console.log(XMLresponse);
//
//     // const json = await response.json()
//     // // console.log(json, "json from actions/index.js");
//     // dispatch({
//     //   type: GAMES_LOADED,
//     //   payload: json.games
//     // })
//   }
// }


// (2)
export function fetchGameCollection(){
  return async (dispatch) => {
    const response = await fetch('http://localhost:3000/games')

    const json = await response.json()
    // console.log(json, "json from actions/index.js");
    dispatch({
      type: GAMES_LOADED,
      payload: json.games
    })
  }
}
