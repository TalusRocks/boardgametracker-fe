import React from 'react'

const GameStats = ({ gameStats }) => {
  // console.log(gameStats, "from GameStats.js");
  return (
    <div >
      {gameStats.map((el, i) => {
        let avgRating = Number(el.rating[0].average[0].$.value).toFixed(2)
        let userRating = el.rating[0].$.value

        return (
          <div className="game-stats">
            <div className="stat avg-rating">{avgRating}</div>
            <div className="stat user-rating">{userRating !== 'N/A' ? userRating : '-'}</div>
            <div className="stat min-player">{el.$.minplayers}</div>
            <div className="stat best-player">X</div>
            <div className="stat max-player">{el.$.maxplayers}</div>
            <div className="stat min-time">{el.$.minplaytime}</div>
            <div className="stat max-time">{el.$.maxplaytime}</div>
            <div className="stat weight">X.XX</div>
          </div>
        )
      })}


    </div>
  )
}

export default GameStats
