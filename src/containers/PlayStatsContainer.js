import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchGameCollection } from '../actions'

const PlayStatsContainer = ({ gameCollection }) => {
  // console.log(gameCollection.byPlays, "from Play Stats Containers");
  return (
    <div className="play-stats-container">
      {gameCollection.byPlays.map((el, i) => {
        return <p key={el.gameid} className="m-1"><span className="mr-1 bold">{el.totalplays}</span>{el.gamename}</p>

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
