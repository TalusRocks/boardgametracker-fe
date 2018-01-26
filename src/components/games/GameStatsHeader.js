import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sortGameCollection } from '../../actions'

class GameStatsHeader extends Component {

    //local state to track direction
    state = {
      bggRating: '',
      yourRating: '',
      minPlayer: '',
      maxPlayer: '',
      minTime: '',
      maxTime: ''
    }

    flip = (key, direction) => {
      const sortKeyDir = { key, direction }
      return () => {
        console.log('key', this.state[key]);
        // console.log(sortKey, "SORT KEY");
        //using closure to return a function
        this.state[key] === '' || this.state[key] === 'asc' ? this.setState({ [key]: 'desc'}) : this.setState({ [key]: 'asc'})

        // if(this.state[key] === '' || this.state[key] === 'asc'){
        //   this.setState({ [key]: 'desc'})
        // } else {
        //   this.setState({ [key]: 'asc'})
        // }

        this.props.sortGameCollection(sortKeyDir)
      }

    }

    render() {
      console.log(this.state);
      return (
        <div>
          <div className="game-stats-headers">
            <div onClick={ this.flip('bggRating', this.state.bggRating)} className="stat-header avg-rating-header">
              <span className="stat-arrow">

<i className="material-icons">
  {
    this.state.bggRating === '' ? `` :
    this.state.bggRating === 'desc' ? `arrow_drop_up` : `arrow_drop_down`
  }
</i>
              </span>
              BGG rating
            </div>
            <div onClick={ this.flip('yourRating', this.state.yourRating)} className="stat-header user-rating-header">
              <span className="stat-arrow">
                <i className="material-icons">arrow_drop_down</i>
              </span>
              your rating
            </div>
            <div onClick={ this.flip('minPlayer', this.state.minPlayer)} className="stat-header min-player-header">
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
            <div onClick={ this.flip('maxPlayer', this.state.maxPlayer)} className="stat-header max-player-header">
              <span className="stat-arrow">
                <i className="material-icons">arrow_drop_down</i>
              </span>
              max player
            </div>
            <div onClick={ this.flip('minTime', this.state.minTime)} className="stat-header min-time-header">
              <span className="stat-arrow">
                <i className="material-icons">arrow_drop_down</i>
              </span>
              min time
            </div>
            <div onClick={ this.flip('maxTime', this.state.maxTime)} className="stat-header max-time-header">
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

}

const mapStateToProps = state => ({
  gameCollection: state.gameCollection,
  sortGames: state.sortGames
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ sortGameCollection }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameStatsHeader)
