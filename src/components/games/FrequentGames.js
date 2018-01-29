import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const FrequentGames = ({ gameCollection }) => {

  const frequentGamesArray = []

  for (let i = 0; i < 6; i++) {
    frequentGamesArray.push(gameCollection.byPlays[i])
  }

  return (
    <div>
      {frequentGamesArray.map((el, i) => {
        return !el ? '' : <p key={el.gameid} className="blue-link text-center mtb-1" data-gameid={el.gameid}>{el.gamename}</p>
      })}
    </div>
  )
}

const mapStateToProps = state => ({
  gameCollection: state.gameCollection
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrequentGames)
