import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchPlays } from '../actions'
import AddPlayButton from '../components/plays/AddPlayButton'

const AllPlaysContainer = ({ allPlays, fetchPlays }) => {

  const justPlays = []
  allPlays.byDate.map((el, i) => {
    justPlays.push(el.plays)
  })

  console.log(allPlays.byDate, "all plays by date");

  return (
    <div>
      <div className="plays-container">

        { allPlays.byDate.map((el, i) => {
          return (
            <div key={el.date}>
              <div key={i} className="date-divider">{el.date}</div>

              {el.plays.map((el, j) => {
                return (
                  <div className="m-1">
                    <h2 key={j} className="mb-025">{el.gamename}</h2>
                    <p>{el.comments ? el.comments : ''}</p>
                  </div>
                )
              })}

            </div>
          )
        })}

      </div>
      <AddPlayButton />
    </div>
  )
}

const mapStateToProps = state => ({
  allPlays: state.allPlays
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchPlays }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPlaysContainer)
