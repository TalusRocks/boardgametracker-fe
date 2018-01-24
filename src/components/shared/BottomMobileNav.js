import React from 'react'
import { NavLink } from 'react-router-dom'

const BottomMobileNav = () => {
  return (
    <div className="mobile-nav bottom-mobile-nav">
        <NavLink className="mobile-nav-item" to='/plays'>Plays</NavLink>
        <NavLink className="mobile-nav-item" to='/games'>Games</NavLink>
    </div>
  )
}

export default BottomMobileNav
