import React from 'react';

const BottomMobileNav = () => {
  return (
    <div className="bottom-mobile-nav">
      <div className="bottom-nav-item bottom-nav-unselected">Plays</div>
      <div className="bottom-nav-item bottom-nav-selected">Games
        <div className="bottom-mobile-nav-selected-bar"></div>
      </div>
    </div>
  )
}

export default BottomMobileNav;
