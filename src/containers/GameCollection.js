import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { filterGameCollection } from '../actions'
import GameStatsHeader from '../components/games/GameStatsHeader'
import FilterGamesButton from '../components/games/FilterGamesButton'
import Game from '../components/games/Game'


class GameCollection extends Component {

  state = {
    activeFilters : false
  }

  submitFilterParams = (e) => {
    e.preventDefault()

    const filterParams = {
      minBggRating: '',
      numPlayers: '',
      maxTime: ''
    }

    this.props.filterGameCollection(filterParams)
    //hides and shows outer div with close 'x'
    this.setState({ activeFilters: false })
  }

  componentDidMount(){
    //check if there are any filter params
    let result = false
    for(var i in this.props.filterGames.byParams){
      if(this.props.filterGames.byParams[i]){
        result = true
        break
      }
    }
    this.setState({ activeFilters: result })
  }

  render () {

    return (
      <div>
        <div className="games-container">
          <GameStatsHeader/>

          { this.state.activeFilters ? <div className="printed-filters m-1">
            <div>
              <div>{this.props.filterGames.byParams.minBggRating ? `min BGG rating:  ${this.props.filterGames.byParams.minBggRating}` : ''}</div>

              <div>{this.props.filterGames.byParams.numPlayers ? `number of players: ${this.props.filterGames.byParams.numPlayers}` : ''}</div>

              <div>{this.props.filterGames.byParams.maxTime ? `max time: ${this.props.filterGames.byParams.maxTime}` : ''}</div>
            </div>

            <i onClick={this.submitFilterParams} className="material-icons cursor-pointer">close</i>
          </div> : ''}

          <Game />
        </div>
        <FilterGamesButton/>
      </div>
    )
    }
}

const mapStateToProps = state => ({
  gameCollection: state.gameCollection,
  username: state.currentUser.username,
  filterGames: state.filterGames
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ filterGameCollection }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameCollection)
