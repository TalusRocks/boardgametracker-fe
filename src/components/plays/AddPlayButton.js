import React from 'react'
import { Link } from 'react-router-dom'

const AddPlayButton = () => {
  return (
    <Link to='/plays/addplay'>
      <div className="button add-play-button">
        <i className="material-icons mr-025">add_circle</i> Add Play
      </div>
    </Link>
  )
}

export default AddPlayButton
