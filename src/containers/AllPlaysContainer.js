import React from 'react'
import AddPlayButton from '../components/plays/AddPlayButton'

const AllPlaysContainer = ({ allPlays }) => {
  console.log(allPlays, "all plays from AllPlaysContainer");
  return (
    <div>
      <div className="m-1">
        { allPlays.all.map((el, i) => {
          return <p key={i}>{el.item[0].$.name}</p>
        })}
      </div>
      <AddPlayButton />
    </div>
  )
}

export default AllPlaysContainer
