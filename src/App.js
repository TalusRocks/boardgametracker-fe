import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        yo!!
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameCollection: []
})

const mapDispatchToProps = state => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
