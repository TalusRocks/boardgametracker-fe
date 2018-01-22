import React from 'react'
import FilterGamesButton from '../components/games/FilterGamesButton'

const GameCollection = ({ gameCollection }) => {
  return (
    <div>
      <div className="m-1 games-container">
        { gameCollection.all.map((el, i) => {
          return <p key={i} className="m-1">{el.name[0]._}</p>
        })}
      </div>
      <FilterGamesButton/>
    </div>
  )
}

export default GameCollection
