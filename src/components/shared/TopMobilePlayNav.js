import React from 'react'
import { NavLink } from 'react-router-dom'

const TopMobilePlayNav = () => {
  return (
    <div className="mobile-nav top-mobile-nav">
      <NavLink exact to='/plays' className="mobile-nav-item" activeClassName="active-blue">Recent</NavLink>
      <NavLink exact to='/plays/stats' className="mobile-nav-item" activeClassName="active-blue">Stats</NavLink>
    </div>
  )
}

export default TopMobilePlayNav
