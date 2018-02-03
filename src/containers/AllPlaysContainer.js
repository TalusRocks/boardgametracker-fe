import React from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AddPlayButton from '../components/plays/AddPlayButton'
import TopMobilePlayNav from '../components/shared/TopMobilePlayNav'
import moment from 'moment'


const AllPlaysContainer = ({ allPlays }) => {

  return (
    <div>
      <div className="add-play-button-desktop">
        <AddPlayButton />
      </div>

      <div className="plays-container">
        <TopMobilePlayNav/>
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
      <div className="add-play-button-mobile">
        <AddPlayButton />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  allPlays: state.allPlays
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPlaysContainer)
