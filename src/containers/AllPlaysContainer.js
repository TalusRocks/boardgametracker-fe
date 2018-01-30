import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { fetchPlays } from '../actions'
import AddPlayButton from '../components/plays/AddPlayButton'


const AllPlaysContainer = ({ allPlays, byDate }) => {
console.log(allPlays.all, "***allPlays.all from AllPlaysContainer****");
console.log(byDate, "byDate");

  return (
    <div>
      <div className="plays-container">

        {!allPlays.all.plays ? '' : allPlays.all.plays.map((el, i) => {
          return (
            <p key={`${el.bgg_gameid}-${i}`}>{el.game_name} {el.played_on}</p>
          )
        })}

        {/* { allPlays.byDate.map((el, i) => {

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

        })} */}

      </div>
      <AddPlayButton />
    </div>
  )
}

const mapStateToProps = state => ({
  allPlays: state.allPlays,
  byDate: state.byDate
})

const mapDispatchToProps = dispatch => ({
  // return bindActionCreators({ fetchPlays }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPlaysContainer)
