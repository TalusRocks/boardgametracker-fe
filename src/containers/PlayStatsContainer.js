import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchGameCollection } from '../actions'

const PlayStatsContainer = ({ gameCollection }) => {
  // console.log(gameCollection.byPlays, "from Play Stats Containers");
  return (
    <div className="play-stats-container">
      {gameCollection.byPlays.map((el, i) => {
        return <div key={el.gameid} className="m-1 plays-by-game-div">
          <div key={`${el.gameid}-${el.totalplays}`} className="mr-1 bold">{el.totalplays}</div>
          <div key={`${el.gamename}-${i}`}>{el.gamename}</div>
        </div>


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
