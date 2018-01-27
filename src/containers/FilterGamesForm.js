import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { filterGameCollection } from '../actions'

class FilterGamesForm extends Component {

  //local state to manage redirect
  state = {
    fireRedirect: false
  }

  submitFilterParams = (e) => {
    e.preventDefault()

    const filterParams = {
      minBggRating: e.target.bggRating.value,
      numPlayers: e.target.numPlayers.value,
      maxTime: e.target.maxTime.value
    }
    
    this.props.filterGameCollection(filterParams)
    this.setState({ fireRedirect: true })
  }

  render () {
    return this.state.fireRedirect === true ? <Redirect to="/games"/> : (
      <div>
        <div className="m-1 form-close">
          Filter Games
          <Link to='/games'>
            <i className="material-icons">close</i>
          </Link>
        </div>
        <div className="m-1">
          <form onSubmit={this.submitFilterParams}>
            <div className="mtb-2">
              <label>
                <span className="caps-title">
                Minimum BGG Rating
                </span>
                <input className="mt-05 text-input" type="text" name="bggRating" defaultValue="6"></input>
              </label>
            </div>
            <div className="mtb-2">
              <label>
                <span className="caps-title">
                Number of Players
                </span>
                <input className="mt-05 text-input" type="text" name="numPlayers" defaultValue="3"></input>
              </label>
            </div>
            <div className="mtb-2">
              <label>
                <span className="caps-title">
                Max Time
                </span>
                <input className="mt-05 text-input" type="text" name="maxTime" defaultValue="60"></input>
              </label>
            </div>
            <input className="button submit mt-1" type="submit" value="Filter"></input>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ filterGameCollection }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterGamesForm)
