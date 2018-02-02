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

      return () => {

        const newState = { [key]: null }
        newState[key] = !this.state[key] || this.state[key] === 'asc' ? 'desc' : 'asc'

        this.setState({
          bggRating: '',
          yourRating: '',
          minPlayer: '',
          maxPlayer: '',
          minTime: '',
          maxTime: '',
          ...newState
        })

        this.props.sortGameCollection({ key, direction: newState[key] })
      }

    }

    render() {
      console.log(this.state, 'state in render');
      return (
        <div>
          <div className="game-stats-headers">
            <div onClick={ this.flip('bggRating', this.state.bggRating)} className="stat-header avg-rating-header">
              <span className="stat-arrow">
                <i className="material-icons">
                  {
                    this.state.bggRating === '' ? `` :
                    this.state.bggRating === 'asc' ? `arrow_drop_up` : `arrow_drop_down`
                  }
                </i>
              </span>
              BGG<br></br>rating
            </div>
            {/* <div onClick={ this.flip('yourRating', this.state.yourRating)} className="stat-header user-rating-header">
              <span className="stat-arrow">
                <i className="material-icons">
                  {this.state.yourRating === '' ? `` :
                    this.state.yourRating === 'asc' ? `arrow_drop_up` : `arrow_drop_down`}
                </i>
              </span>
              your<br></br>rating
            </div> */}
            <div onClick={ this.flip('minPlayer', this.state.minPlayer)} className="stat-header min-player-header">
              <span className="stat-arrow">
                <i className="material-icons">
                  {this.state.minPlayer === '' ? `` :
                    this.state.minPlayer === 'asc' ? `arrow_drop_up` : `arrow_drop_down`}
                </i>
              </span>
              min<br></br>player
            </div>
            {/* <div className="stat-header best-player-header">
              <span className="stat-arrow">
                <i className="material-icons">arrow_drop_down</i>
              </span>
              best<br></br>player
            </div> */}
            <div onClick={ this.flip('maxPlayer', this.state.maxPlayer)} className="stat-header max-player-header">
              <span className="stat-arrow">
                <i className="material-icons">
                  {this.state.maxPlayer === '' ? `` :
                    this.state.maxPlayer === 'asc' ? `arrow_drop_up` : `arrow_drop_down`}
                </i>
              </span>
              max<br></br>player
            </div>
            <div onClick={ this.flip('minTime', this.state.minTime)} className="stat-header min-time-header">
              <span className="stat-arrow">
                <i className="material-icons">
                  {this.state.minTime === '' ? `` :
                    this.state.minTime === 'asc' ? `arrow_drop_up` : `arrow_drop_down`}
                </i>
              </span>
              min<br></br>time
            </div>
            <div onClick={ this.flip('maxTime', this.state.maxTime)} className="stat-header max-time-header">
              <span className="stat-arrow">
                <i className="material-icons">
                  {this.state.maxTime === '' ? `` :
                    this.state.maxTime === 'asc' ? `arrow_drop_up` : `arrow_drop_down`}
                </i>
              </span>
              max<br></br>time
            </div>
            {/* <div className="stat-header weight-header">
              <span className="stat-arrow">
                <i className="material-icons">arrow_drop_down</i>
              </span>
              weight
            </div> */}
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
