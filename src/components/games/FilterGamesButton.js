import React from 'react'
import { Link } from 'react-router-dom'

const FilterGamesButton = () => {
  return (
    <Link to='/games/filtergames'>
      <div className="button filter-games-button">
        <i className="material-icons mr-025">search</i> Filter Games
      </div>
    </Link>
  )
}

export default FilterGamesButton
