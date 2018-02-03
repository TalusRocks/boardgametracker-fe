import React from 'react'

const GameStats = ({ gameStats }) => {
  // console.log(gameStats, "from GameStats.js");
  return (
    <div >
      {gameStats.map((el, i) => {
        let avgRating = Number(el.rating[0].average[0].$.value).toFixed(2)
        // let userRating = el.rating[0].$.value

        return (
          <div key={`game-stats-${i}`} className="game-stats">
            <div key={`avgrating-${i}`} className="stat avg-rating">{avgRating}</div>
            {/* <div key={`userrating-${i}`} className="stat user-rating">{userRating !== 'N/A' ? userRating : '-'}</div> */}
            <div key={`minplayers-${i}`} className="stat min-player">{el.$.minplayers}</div>
            {/* <div key={`bestplayers-${i}`} className="stat best-player">X</div> */}
            <div key={`maxplayers-${i}`} className="stat max-player">{el.$.maxplayers}</div>
            <div key={`mintime-${i}`} className="stat min-time">{el.$.minplaytime}</div>
            <div key={`maxtime-${i}`} className="stat max-time">{el.$.maxplaytime}</div>
            {/* <div key={`weight-${i}`} className="stat weight">X.XX</div> */}
          </div>
        )
      })}


    </div>
  )
}

export default GameStats
