import React, { Component } from 'react';
import './App.css';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import Game from './components/Game';
import rootStore from './stores';

useStrict(true);

class App extends Component {
  render() {
    return (
      <Provider stores={rootStore}>
        <Game />
      </Provider>
    );
  }
}

export default App;
