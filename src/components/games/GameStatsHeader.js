import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sortGameCollection } from '../../actions'


// onClick={ flip('bggRating') }
const GameStatsHeader = ({ sortedGames, sortGameCollection }) => {
// console.log(sortedGames, "SORT. GAMES. BY.");

    const flip = (key, direction) => {
      const sortKey = { key, direction }
      console.log(sortKey, "SORT KEY");
      //using closure to return a function 
      return () => {
        sortGameCollection(sortKey)
      }

    }

    return (
      <div>
        <div className="game-stats-headers">
          <div onClick={ flip('bggRating', 'descending')} className="stat-header avg-rating-header">
            <span className="stat-arrow">
              <i className="material-icons">arrow_drop_down</i>
            </span>
            BGG rating
          </div>
          <div className="stat-header user-rating-header">
            <span className="stat-arrow">
              <i className="material-icons">arrow_drop_down</i>
            </span>
            your rating
          </div>
          <div className="stat-header min-player-header">
            <span className="stat-arrow">
              <i className="material-icons">arrow_drop_down</i>
            </span>
            min player
          </div>
          <div className="stat-header best-player-header">
            <span className="stat-arrow">
              <i className="material-icons">arrow_drop_down</i>
            </span>
            best player
          </div>
          <div className="stat-header max-player-header">
            <span className="stat-arrow">
              <i className="material-icons">arrow_drop_down</i>
            </span>
            max player
          </div>
          <div className="stat-header min-time-header">
            <span className="stat-arrow">
              <i className="material-icons">arrow_drop_down</i>
            </span>
            min time
          </div>
          <div className="stat-header max-time-header">
            <span className="stat-arrow">
              <i className="material-icons">arrow_drop_down</i>
            </span>
            max time
          </div>
          <div className="stat-header weight-header">
            <span className="stat-arrow">
              <i className="material-icons">arrow_drop_down</i>
            </span>
            weight
          </div>
        </div>
      </div>
    )

}

const mapStateToProps = state => ({
  gameCollection: state.gameCollection,
  sortedGames: state.sortedGames
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ sortGameCollection }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameStatsHeader)
