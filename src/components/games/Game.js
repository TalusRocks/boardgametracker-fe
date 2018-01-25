import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchGameCollection } from '../../actions'
import GameStatsHeader from './GameStatsHeader'

// { gameCollection.all.map((el, i) => {
//   return <p key={i} className="m-1">{el.name[0]._}</p>
// })}

const Game = ({ gameCollection }) => {
  return (
    <div>

        <GameStatsHeader/>
        
        <div className="one-game-container">
          <h2 className="game-name">Game Name</h2>
          <div className="game-comments">Comments if there are some. La de da, about the Lorem Ipsum ha.</div>
          <div className="game-stats">
            <div className="stat avg-rating">8.2</div>
            <div className="stat user-rating">7.5</div>
            <div className="stat min-player">2</div>
            <div className="stat best-player">3</div>
            <div className="stat max-player">5</div>
            <div className="stat min-time">90</div>
            <div className="stat max-time">120</div>
            <div className="stat weight">3.35</div>
          </div>
        </div>

      </div>
  )
}

const mapStateToProps = state => ({
  gameCollection: state.gameCollection
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchGameCollection }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
