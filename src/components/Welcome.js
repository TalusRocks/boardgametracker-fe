import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sendBGGUsername, fetchGameCollection, downloadPlays } from '../actions'
import { Link, Redirect } from 'react-router-dom'

const Welcome = ({ username, sendBGGUsername, fetchGameCollection, downloadPlays }) => {

  const submitBGGUsername = (e) => {
    e.preventDefault()
    sendBGGUsername(e.target.bggusername.value)
    fetchGameCollection()
    downloadPlays()
  }

  return username ? <Redirect to="/plays"/> : <div className="m-1 text-center">
    <h1 className="mtb-1">Welcome!</h1>
    {/* <p>{username ? username : 'no username'}</p> */}
    <p className="mtb-2">Do you have a BoardGameGeek account?
      <br></br>
      If you do, enter your username here to load your logged plays and game collection! Otherwise, you can skip this step.
    </p>

    <form onSubmit={submitBGGUsername} className="mb-2">
      <label>
        <span className="caps-title">BoardGameGeek UserName</span>
        <br></br>
        <input className="mt-05 text-input text-center" type="text" name="bggusername" placeholder="BGG username"></input>
      </label>

      <input className="button submit green mt-1" type="submit" value="Get BGG Data" />
    </form>
    <Link to='/plays'>
      <p className="green-link mtb-2">SKIP THIS</p>
    </Link>
  </div>
}

const mapStateToProps = state => ({
  username: state.currentUser.username
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ sendBGGUsername, fetchGameCollection, downloadPlays }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome)
