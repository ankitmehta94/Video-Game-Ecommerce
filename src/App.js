import React, { Component } from 'react';

import './App.css';
import VerticalMenu from './VerticalMenu.js'
import GamesList from './GamesList'
class App extends Component {
  render() {
    return (
      <div className="flex-row-center full-height">
        <VerticalMenu  />
        <GamesList   />
      </div>
    );
  }
}

export default App;
