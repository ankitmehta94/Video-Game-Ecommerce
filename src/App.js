import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import VerticalMenu from './VerticalMenu.js'
import GamesList from './GamesList'
class App extends Component {
  render() {
    return (
        <div className="ui container">
      <div className="ui grid">
        <VerticalMenu />
        <GamesList  />
      </div>
        </div>
    );
  }
}

export default App;
