import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchPlays } from '../actions'
import AddPlayButton from '../components/plays/AddPlayButton'

const AllPlaysContainer = ({ allPlays, fetchPlays }) => {

  // const justPlays = []
  // allPlays.byDate.map((el, i) => {
  //   justPlays.push(el.plays)
  // })

  return (
    <div>
      <div className="plays-container">

        { allPlays.byDate.map((el, i) => {
          return (
            <div key={`${el.date}-00-${i}`}>
              <div key={el.date} className="date-divider">{el.date}</div>

              {el.plays.map((el, j) => {
                return (
                  <div key={`${el.gamename}-${el.playid}`} className="m-1">
                    <h2 key={el.playid} className="mb-025">{el.gamename}</h2>
                    <p key={`${el.playid}-comments`}>{el.comments ? el.comments : ''}</p>
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
