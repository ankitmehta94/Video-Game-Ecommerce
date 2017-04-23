import React, { Component } from 'react';
import logo from './logo.svg';
import navBar from './navBar'
import './App.css';
import VerticalMenu from './VerticalMenu.js'
import GamesList from './GamesList'
class App extends Component {
  render() {
    return (
        <div>
            <navBar/>
      <div className="App ui grid">
        <VerticalMenu />
        <GamesList  />
      </div>
        </div>
    );
  }
}

export default App;
