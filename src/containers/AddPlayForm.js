import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import FrequentGames from '../components/games/FrequentGames'

class AddPlayForm extends Component {

  state = {
    fireRedirect: false
  }

  submitNewPlay = (e) => {
    e.preventDefault()

    const newPlayParams = {
      playDate: e.target.playDate.value,
      playGame: e.target.playGame.value,
      playComments: e.target.playComments.value
    }
    console.log(newPlayParams);
    // this.setState({ fireRedirect: true })
  }

  render() {
    return this.state.fireRedirect === true ? <Redirect to="/plays"/> : (
      <div>
        <div className="m-1 form-close">
          Add New Play
          <Link to='/plays'>
            <i className="material-icons">close</i>
          </Link>
        </div>
        <div className="m-1">
          <form onSubmit={this.submitNewPlay}>
            <div className="mtb-2">
              <label>
                <span className="caps-title">
                Date
                </span>
                <input className="mt-05 text-input" type="text" name="playDate" defaultValue="2018-01-28"></input>
              </label>
            </div>
            <div className="mt-2 mb-1">
              <label>
                <span className="caps-title">
                Game
                </span>
                <input className="mt-05 text-input" type="text" name="playGame" defaultValue="Splendor"></input>
              </label>
            </div>
            <div className="button short-btn">Search BoardGameGeek</div>

            <p className="text-center mt-1">Or choose from frequently played:</p>

            <FrequentGames />

            <div className="mtb-2">
              <label>
                <span className="caps-title">
                Comments
                </span>
                <textarea className="mt-05" rows="4" name="playComments" defaultValue="with first module from new expansion"></textarea>
              </label>
            </div>
            <input className="button submit green mt-1" type="submit" value="Save Now"></input>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPlayForm)
