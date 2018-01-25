import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sortGameCollection } from '../../actions'

const flip = (key) => {
  return () => {
    const sortByThis = { [key]: !this.state[key]}
    sortGameCollection(sortByThis)
  }
}
// onClick={ flip('bggRating') }
const GameStatsHeader = ({ sortedGames }) => {
console.log(sortedGames, "SORT. GAMES. BY.");
    return (
      <div>
        <div className="game-stats-headers">
          <div className="stat-header avg-rating-header">
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
