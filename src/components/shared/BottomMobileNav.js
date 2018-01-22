import React from 'react'
import { Link } from 'react-router-dom'

const BottomMobileNav = () => {
  return (
    <div className="bottom-mobile-nav">
      <Link to='/plays'>
        <div className="bottom-nav-item bottom-nav-unselected">Plays</div>
      </Link>
      <Link to='/games'>
        <div className="bottom-nav-item bottom-nav-selected">Games
          <div className="bottom-mobile-nav-selected-bar right"></div>
        </div>
      </Link>
    </div>
  )
}

export default BottomMobileNav
