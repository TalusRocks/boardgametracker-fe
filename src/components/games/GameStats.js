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
            <div className="stat min-player">2</div>
            <div className="stat best-player">3</div>
            <div className="stat max-player">5</div>
            <div className="stat min-time">90</div>
            <div className="stat max-time">120</div>
            <div className="stat weight">3.35</div>
          </div>
        )
      })}


    </div>
  )
}

export default GameStats
