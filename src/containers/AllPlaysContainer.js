import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AddPlayButton from '../components/plays/AddPlayButton'
import moment from 'moment'


const AllPlaysContainer = ({ allPlays, byDate }) => {
console.log(allPlays.byDate, "***allPlays from AllPlaysContainer****");

  return (
    <div>
      <div className="plays-container">

        { allPlays.byDate.map((el, i) => {

          return (
            <div key={`${el.date}-wrapper-${i}`}>
              <div key={`${el.date}-date-${i}`} className="date-divider">{moment(el.date).format('D MMMM, YYYY')}</div>

              {el.plays.map((el, j) => {
                return (
                  <div key={`${el.gamename}-wrapper-${j}`} className="m-1">
                    <h2 key={`${i}-gamename`} className="mb-025">{el.gamename}</h2>
                    <p key={`${i}-comments`}>{el.comments ? el.comments : ''}</p>
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

const mapDispatchToProps = dispatch => ({
  // return bindActionCreators({ fetchPlays }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPlaysContainer)
