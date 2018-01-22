import React from 'react'

const Welcome = () => {
  return (
    <div className="m-1 text-center">
      <h1 className="mtb-2">Welcome!</h1>
      <p className="mtb-2">Do you have a BoardGameGeek account?
        <br></br>
        If you do, enter your username here to load your logged plays and game collection! Otherwise, you can skip this step.
      </p>

      <form className="mb-2">
        <label>
          <span className="caps-title">BoardGameGeek UserName</span>
          <br></br>
          <input className="mt-05 text-input" type="text" name="bgg-username" placeholder="BGG username"></input>
        </label>
      </form>

      <div className="button green">Get BGG Data</div>
      <p className="green-link mtb-2">SKIP THIS</p>
    </div>
  )
}

export default Welcome
