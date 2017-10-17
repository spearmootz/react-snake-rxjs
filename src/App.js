import React, { Component } from 'react';
import './App.css';
import { Provider } from 'mobx-react';
import Game from './components/Game';

class App extends Component {
  render() {
    return (
      <Provider test="test">
        <Game />
      </Provider>
    );
  }
}

export default App;
