import React from 'react'
import { NavLink } from 'react-router-dom'

const BottomMobileNav = () => {
  return (
    <div className="bottom-mobile-nav">
        <NavLink className="bottom-nav-item" to='/plays'>Plays</NavLink>
        <NavLink className="bottom-nav-item" to='/games'>Games</NavLink>
    </div>
  )
}

export default BottomMobileNav
