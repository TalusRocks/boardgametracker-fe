import React from 'react'

const GameCollection = ({ gameCollection }) => {
  console.log(gameCollection.all, "gameCollection.all from GameCollection component");

  return (
    <div>
      { gameCollection.all.map((el, i) => {
        return <p key={i}>{el.name}</p>
      })}
    </div>
  )
}

export default GameCollection
