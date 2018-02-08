import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { filterGameCollection } from '../actions'

class FilterGamesForm extends Component {

  //local state to manage redirect
  state = {
    fireRedirect: false,
    formError: false
  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  formError = () => {
    let textInputValues = document.querySelectorAll('.text-input')

    textInputValues.forEach((el) => {
      if (el.value.length >= 1 && this.isNumeric(el.value)) {
        this.setState({ formError: false })
      }
    })

    textInputValues.forEach((el) => {
      if (el.value.length >= 1 && !this.isNumeric(el.value)) {
        this.setState({ formError: true })
      }
    })

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
            <div className="mtb-1">
              <label>
                <span className="caps-title">
                Minimum BGG Rating
                </span>
                <input onBlur={this.formError} className="mt-05 text-input" type="text" name="bggRating" id="bggRating" placeholder="number between 1 and 10"></input>
              </label>
            </div>
            <div className="mtb-2">
              <label>
                <span className="caps-title">
                Number of Players
                </span>
                <input onBlur={this.formError} className="mt-05 text-input" type="text" name="numPlayers" id="numPlayers"></input>
              </label>
            </div>
            <div className="two-inputs">
              <div className="mtb-2 input-left">
                <label>
                  <span className="caps-title">
                  Min Time
                  </span>
                  <input onBlur={this.formError} className="mt-05 text-input" type="text" name="minTime" id="minTime"></input>
                </label>
              </div>
              <div className="mtb-2 input-right">
                <label>
                  <span className="caps-title">
                  Max Time
                  </span>
                  <input onBlur={this.formError} className="mt-05 text-input" type="text" name="maxTime" id="maxTime"></input>
                </label>
              </div>
            </div>

            { this.state.formError === false ? '' :
            <div className="form-error">
              Search terms must be numbers
            </div>}

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
