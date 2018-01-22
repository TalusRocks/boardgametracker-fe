import React from 'react'

const GameCollection = ({ gameCollection }) => {
  return (
    <div className="m-1">
      { gameCollection.all.map((el, i) => {
        return <p key={i}>{el.name[0]._}</p>
      })}
    </div>
  )
}

export default GameCollection
