import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchGameCollection } from '../actions'
import FilterGamesButton from '../components/games/FilterGamesButton'


const GameCollection = ({ username, gameCollection, fetchGameCollection }) => {
  // console.log(gameCollection);
  return (
      <div>
        <div className="m-1 games-container">
          { gameCollection.all.map((el, i) => {
            return <p key={i} className="m-1">{el.name[0]._}</p>
          })}
        </div>
        <FilterGamesButton/>
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
)(GameCollection)
