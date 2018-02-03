import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchGameCollection } from '../actions'
import TopMobilePlayNav from '../components/shared/TopMobilePlayNav'

const PlayStatsContainer = ({ gameCollection, playsPerGame }) => {
  let hindex = false

  return (
    <div className="play-stats-container">
      <TopMobilePlayNav/>
      {playsPerGame.all.map((el, i) => {
        return (
          <div key={i}>
            <div key={`h-index=${i}`} className={ i >= el.totalplays && hindex === false ? `h-index` : '' }>
              { i >= el.totalplays && hindex === false ? (hindex = true,  `H-index is ${i}`) : null }
            </div>
            <div key={el.bgg_game_id} className={`p-1 plays-by-game-div
              ${el.totalplays >= 100 ? 'purple-100' :
              el.totalplays >= 50 ? 'blue-50' :
              el.totalplays >= 25 ? 'green-25' :
              el.totalplays >= 10 ? 'orange-10' :
              el.totalplays >= 5 ? 'yellow-5' :
              '' }
              `}>
              <div key={`${el.bgg_game_id}-${el.totalplays}`} className="mr-1 bold">{el.totalplays}</div>
              <div key={`${el.game_name}-${i}`}>
                <span>{el.game_name}</span>

                <span className={`stat-money
                  ${el.totalplays >= 100 ? 'dark-purple-100' :
                  el.totalplays >= 50 ? 'dark-blue-50' :
                  el.totalplays >= 25 ? 'dark-green-25' :
                  el.totalplays >= 10 ? 'dark-orange-10' :
                  el.totalplays >= 5 ? 'dark-yellow-5' :
                  ''}`}>
                  {el.totalplays >= 100 ? '$1' :
                  el.totalplays >= 50 ? '50c' :
                  el.totalplays >= 25 ? '25c' :
                  el.totalplays >= 10 ? '10c' :
                  el.totalplays >= 5 ? '5c' :
                  ''}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => ({
  gameCollection: state.gameCollection,
  username: state.currentUser.username,
  playsPerGame: state.playsPerGame
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchGameCollection }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayStatsContainer)
