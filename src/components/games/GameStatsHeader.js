import React from 'react'

const GameStatsHeader = () => {
  return (
    <div>
      <div className="game-stats-headers">
        <div className="stat-header avg-rating-header">
          <span className="stat-arrow">
            <i class="material-icons">arrow_drop_down</i>
          </span>
          BGG rating
        </div>
        <div className="stat-header user-rating-header">
          <span className="stat-arrow">
            <i class="material-icons">arrow_drop_down</i>
          </span>
          your rating
        </div>
        <div className="stat-header min-player-header">
          <span className="stat-arrow">
            <i class="material-icons">arrow_drop_down</i>
          </span>
          min player
        </div>
        <div className="stat-header best-player-header">
          <span className="stat-arrow">
            <i class="material-icons">arrow_drop_down</i>
          </span>
          best player
        </div>
        <div className="stat-header max-player-header">
          <span className="stat-arrow">
            <i class="material-icons">arrow_drop_down</i>
          </span>
          max player
        </div>
        <div className="stat-header min-time-header">
          <span className="stat-arrow">
            <i class="material-icons">arrow_drop_down</i>
          </span>
          min time
        </div>
        <div className="stat-header max-time-header">
          <span className="stat-arrow">
            <i class="material-icons">arrow_drop_down</i>
          </span>
          max time
        </div>
        <div className="stat-header weight-header">
          <span className="stat-arrow">
            <i class="material-icons">arrow_drop_down</i>
          </span>
          weight
        </div>
      </div>
    </div>
  )
}

export default GameStatsHeader
