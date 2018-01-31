import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import FrequentGames from '../components/games/FrequentGames'
import { searchBoardGameGeek, postNewPlay } from '../actions'


class AddPlayForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fireRedirect: false,
      selectedGame: '',
      selectedGameId: ''
    }
  }

  selectBggGame = (e) => {
    document.getElementById('playGame').value = e.target.textContent

    this.setState({selectedGame: e.target.textContent, selectedGameId: e.target.id})
  }

  sendSearchParam = () => {
    let searchGame = document.getElementById('playGame').value

    this.props.searchBoardGameGeek(searchGame)
  }

  submitNewPlay = (e) => {
    e.preventDefault()

    const newPlayParams = {
      user_id: 1,
      game_name: e.target.playGame.value,
      bgg_game_id: this.state.selectedGameId,
      comment: e.target.playComments.value,
      played_on: e.target.playDate.value
    }

    this.props.postNewPlay(newPlayParams)
    this.setState({ fireRedirect: true })
  }

  removeGameNameState = () => {
    this.setState({selectedGame: ''})
  }

  render() {
    return this.state.fireRedirect === true ? <Redirect to="/plays"/> : (
      <div>
        <div className="m-1 form-close">
          Add New Play
          <Link to='/plays'>
            <i className="material-icons">close</i>
          </Link>
        </div>
        <div className="m-1">
          <form onSubmit={this.submitNewPlay}>
            <div className="mtb-2">
              <label>
                <span className="caps-title">
                Date
                </span>
                <input className="mt-05 text-input" type="text" name="playDate" defaultValue="2018-01-30"></input>
              </label>
            </div>
            <div className="mt-2 mb-1">
              <label>
                <span className="caps-title">
                Game
                </span>

                <input onChange={this.removeGameNameState} className={`mt-05 text-input ${this.state.selectedGame ? 'blue-link' : 'noGameInState'}`} type="text" name="playGame" id="playGame" placeholder="Game to search for"></input>

              </label>
            </div>

            <div onClick={this.sendSearchParam} className="button short-btn">Search BoardGameGeek</div>

            <div>{!this.props.bggSearchResults.all ? '' : this.props.bggSearchResults.all.map((el, i) => {
              // console.log(el, "EL");
              return <p onClick={this.selectBggGame} key={`${el.name}-${i}`} className="blue-link text-center mtb-1" id={el.$.id}>{el.name[0].$.value}</p>
            }) }</div>

            <p className="text-center mt-1">Or choose from frequently played:</p>

            <FrequentGames selectGameFunction={(e) => this.selectBggGame(e)}/>

            <div className="mtb-2">
              <label>
                <span className="caps-title">
                Comments
                </span>
                <textarea className="mt-05" rows="4" name="playComments" defaultValue="with first module from new expansion"></textarea>
              </label>
            </div>
            <input className="button submit green mt-1" type="submit" value="Save Now"></input>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  bggSearchResults: state.bggSearchResults
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ searchBoardGameGeek, postNewPlay }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPlayForm)
