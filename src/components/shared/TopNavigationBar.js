import React from 'react';
import { NavLink } from 'react-router-dom'

const TopNavigationBar = () => {
  return (
    <nav>
      <p className="brand">board game friend</p>
      <div className="desktop-menu">
        <NavLink to='/plays' activeClassName="active-top-navbar" className="desktop-menu-item">Plays</NavLink>
        <NavLink to='/games' activeClassName="active-top-navbar" className="desktop-menu-item">Games</NavLink>
      </div>
      <i className="menu-burger material-icons">menu</i>
    </nav>
  )
}

export default TopNavigationBar;
