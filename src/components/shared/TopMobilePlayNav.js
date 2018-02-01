import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { calculatePlaysPerGame } from '../../actions'
import { NavLink } from 'react-router-dom'

const TopMobilePlayNav = ({ calculatePlaysPerGame }) => {
  return (
    <div className="mobile-nav top-mobile-nav">
      <NavLink exact to='/plays' className="black mobile-nav-item" activeClassName="active-blue">Recent</NavLink>
      <NavLink exact to='/plays/stats' onClick={calculatePlaysPerGame} className="black mobile-nav-item" activeClassName="active-blue">Stats</NavLink>
    </div>
  )
}



const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ calculatePlaysPerGame }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopMobilePlayNav)
