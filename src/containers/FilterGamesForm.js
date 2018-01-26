import React from 'react'
import { Link } from 'react-router-dom'

const FilterGamesForm = () => {
  return (
    <div>
      <div className="m-1 form-close">
        Filter Games
        <Link to='/games'>
          <i className="material-icons">close</i>
        </Link>
      </div>
      <div className="m-1">
        <form>
          <div className="mtb-2">
            <label>
              <span className="caps-title">
              Minimum BGG Rating
              </span>
              <input className="mt-05 text-input" type="text" name="bggRating"></input>
            </label>
          </div>
          <div className="mtb-2">
            <label>
              <span className="caps-title">
              Number of Players
              </span>
              <input className="mt-05 text-input" type="text" name="numPlayers"></input>
            </label>
          </div>
          <div className="mtb-2">
            <label>
              <span className="caps-title">
              Max Time
              </span>
              <input className="mt-05 text-input" type="text" name="maxTime"></input>
            </label>
          </div>
          <input className="button submit mt-1" type="submit" value="Filter"></input>
        </form>
      </div>
    </div>
  )
}

export default FilterGamesForm
