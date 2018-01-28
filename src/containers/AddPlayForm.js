import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

class AddPlayForm extends Component {

  state = {
    fireRedirect: false
  }

  submitNewPlay = (e) => {
    e.preventDefault()
    console.log("submitted new play!");
    this.setState({ fireRedirect: true })
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
                <input className="mt-05 text-input" type="text" name="date"></input>
              </label>
            </div>
            <div className="mtb-2">
              <label>
                <span className="caps-title">
                Game
                </span>
                <input className="mt-05 text-input" type="text" name="game"></input>
              </label>
            </div>
            <div>
              <p className="blue-link text-center mtb-1">Grand Austria Hotel</p>
              <p className="blue-link text-center mtb-1">Star Wars: Destiny</p>
              <p className="blue-link text-center mtb-1">Scythe</p>
              <p className="blue-link text-center mtb-1">FUSE</p>
              <p className="blue-link text-center mtb-1">The Castles of Burgundy</p>
            </div>
            <div className="button short-btn">Search BoardGameGeek</div>
            <div className="mtb-2">
              <label>
                <span className="caps-title">
                Comments
                </span>
                <textarea className="mt-05" rows="4" name="date"></textarea>
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
