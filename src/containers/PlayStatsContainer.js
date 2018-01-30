import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchGameCollection } from '../actions'

const PlayStatsContainer = ({ gameCollection }) => {
  // console.log(gameCollection.byPlays, "from Play Stats Containers");
  let hindex = false
  //is state only growing? deleted play on BGG and h-index won't go back down
  return (
    <div className="play-stats-container">
      {gameCollection.byPlays.map((el, i) => {
        return (
          <div key={i}>
            <div key={`h-index=${i}`} className={ i >= el.totalplays && hindex === false ? `h-index` : '' }>
              { i >= el.totalplays && hindex === false ? (hindex = true,  `H-index is ${i}`) : null }
            </div>
            <div key={el.gameid} className={`p-1 plays-by-game-div
              ${el.totalplays >= 100 ? 'purple-100' :
              el.totalplays >= 50 ? 'blue-50' :
              el.totalplays >= 25 ? 'green-25' :
              el.totalplays >= 10 ? 'orange-10' :
              el.totalplays >= 5 ? 'yellow-5' :
              '' }
              `}>
              <div key={`${el.gameid}-${el.totalplays}`} className="mr-1 bold">{el.totalplays}</div>
              <div key={`${el.gamename}-${i}`}>{el.gamename}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => ({
  gameCollection: state.gameCollection,
  username: state.currentUser.username
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchGameCollection }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayStatsContainer)
