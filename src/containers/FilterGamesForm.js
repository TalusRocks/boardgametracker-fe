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
      minTime: e.target.minTime.value,
      maxTime: e.target.maxTime.value
    }

    this.props.filterGameCollection(filterParams)
    this.setState({ fireRedirect: true })
  }

  render () {
    return this.state.fireRedirect === true ? <Redirect to="/games"/> : (
      <div className="form-wrapper">
        <div className="p-1 form-close">
          Filter Games
          <Link to='/games'>
            <i className="material-icons">close</i>
          </Link>
        </div>
        <div className="p-1">
          <form onSubmit={this.submitFilterParams}>
            <div className="mtb-2">
              <label>
                <span className="caps-title">
                Minimum BGG Rating
                </span>
                <input className="mt-05 text-input" type="text" name="bggRating"></input>
              </label>
            </div>
            <div className="mtb-2">
              <label>
                <span className="caps-title">
                Number of Players
                </span>
                <input className="mt-05 text-input" type="text" name="numPlayers"></input>
              </label>
            </div>
            <div className="two-inputs">
              <div className="mtb-2 input-left">
                <label>
                  <span className="caps-title">
                  Min Time
                  </span>
                  <input className="mt-05 text-input" type="text" name="minTime"></input>
                </label>
              </div>
              <div className="mtb-2 input-right">
                <label>
                  <span className="caps-title">
                  Max Time
                  </span>
                  <input className="mt-05 text-input" type="text" name="maxTime"></input>
                </label>
              </div>
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
