import React, { Component } from 'react';

import './App.css';
import VerticalMenu from './VerticalMenu.js'
import GamesList from './GamesList'
class App extends Component {
  render() {
    return (
        <div className="ui container full-height">
      <div className="ui grid full-height">
        <VerticalMenu />
        <GamesList  />
      </div>
        </div>
    );
  }
}

export default App;
