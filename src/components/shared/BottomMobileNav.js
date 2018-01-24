import React from 'react'
import { NavLink } from 'react-router-dom'

const BottomMobileNav = () => {
  return (
    <div className="mobile-nav bottom-mobile-nav">
        <NavLink className="black mobile-nav-item" to='/plays'>Plays</NavLink>
        <NavLink className="black mobile-nav-item" to='/games'>Games</NavLink>
    </div>
  )
}

export default BottomMobileNav
