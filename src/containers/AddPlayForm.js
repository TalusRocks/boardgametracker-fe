import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postPlay } from '../actions'

//onSubmit... do this:
//a function that fetches a POST
//un, pw, cookie
//send FORM data

const AddPlayForm = ({ postPlay }) => {

  const submitNewPlay = (e) => {
    e.preventDefault()
    postPlay()
  }

  return (
    <div>
      <div className="m-1 form-close">
        Add New Play
        <Link to='/plays'>
          <i className="material-icons">close</i>
        </Link>
      </div>
      <div className="m-1">
        <form onSubmit={submitNewPlay}>
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


const mapStateToProps = state => ({
  allPlays: state.allPlays,
  username: state.currentUser.username
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ postPlay }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPlayForm)
