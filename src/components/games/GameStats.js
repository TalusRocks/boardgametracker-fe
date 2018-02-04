import React from 'react'

const GameStats = ({ gameStats }) => {
  return (
    <div >
      {gameStats.map((el, i) => {
        let avgRating = Number(el.rating[0].average[0].$.value).toFixed(2)

        return (
          <div key={`game-stats-${i}`} className="game-stats">
            <div key={`avgrating-${i}`} className="stat avg-rating">{avgRating}</div>
            <div key={`minplayers-${i}`} className="stat min-player">{el.$.minplayers}</div>
            <div key={`maxplayers-${i}`} className="stat max-player">{el.$.maxplayers}</div>
            <div key={`mintime-${i}`} className="stat min-time">{el.$.minplaytime}</div>
            <div key={`maxtime-${i}`} className="stat max-time">{el.$.maxplaytime}</div>
          </div>
        )
      })}

    </div>
  )
}

export default GameStats
