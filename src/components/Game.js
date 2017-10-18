import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './Game.css';
import Score from './Score';
import Grid from './Grid';
import Snake from './Snake';
import Dot from './Dot';
import gameService from './../services/game';

@inject('stores') @observer
export default class Game extends Component {

  componentWillMount () {
    gameService.reset();
  }

  render() {
    const { dimensions } = this.props.stores;

    return (
      <div>
        <Score />
        <div className='game' style={{ height: dimensions.gameLength, width: dimensions.gameLength, margin: `${dimensions.verticalMargin}px ${dimensions.horizontalMargin}px 0px` }}>
          <Grid />
          <Snake />
          <Dot />
        </div>
      </div>
    );
  }
}
