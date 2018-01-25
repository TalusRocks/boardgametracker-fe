import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GameComment from './GameComment'


const GameText = ({ gameCollection }) => {
  return (
    <div>
      { gameCollection.all.map((el, i) => {
        return <div><h2 key={`${el.name}-${i}`} className="game-name">{el.name[0]._}</h2>
        <GameComment gameComment={el.comment ? el.comment : ''}/></div>
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
)(GameText)
