import React from 'react'
import AddPlayButton from '../components/plays/AddPlayButton'

const AllPlaysContainer = ({ allPlays }) => {
  console.log(allPlays, "all plays from AllPlaysContainer");
  return (
    <div>
      <div className="m-1 plays-container">
        { allPlays.all.map((el, i) => {
          return <div key={el.$.id} className="mtb-2">
            <h2 className="mb-025">{el.item[0].$.name}</h2>
            <p>{el.comments}</p>
          </div>
        })}
      </div>
      <AddPlayButton />
    </div>
  )
}

export default AllPlaysContainer
