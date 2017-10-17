import React, { Component } from 'react';
import { inject } from 'mobx-react';
import './Game.css';
import stateStore from './../utils/stateStore';
import Grid from './Grid';
import Snake from './Snake';
import Dot from './Dot';

@inject('test')
export default class Game extends Component {
  static initalState = {
    snake: [{ x: 15, y: 15 }],
    dot: { x: 15,  y: 15 },
    direction: { x: 0, y: 0 }
  }

  static baseStepSpeed = 100;

  state = Game.initalState

  subscriptions = [];

  interval = null;

  componentWillMount () {
    this.reset();
    this.subscriptions.push(stateStore.subscribe(this.handleStateChange));
  }

  componentDidMount () {
    this.setInterval();
  }

  step = () => {
    const { direction, snake } = this.state;

    const newSnake = [...snake];

    const head = {
      x: direction.x + snake[0].x,
      y: direction.y + snake[0].y
    };

    newSnake.unshift(head);

    if (!this.caughtDot(head)) {
      if (this.checkDead(head)) {
        return this.reset();
      } else {
        newSnake.pop();
      }
    } else {
      this.generateNewDot();
    }

    this.setState({
      snake: newSnake
    });
  }

  generateNewDot = () => {
    const { screen: { dimension } } = this.state;
    let onSnake = true;
    let dot;
    while (onSnake) {
      dot = {
        x: Math.round(Math.random() * (dimension - 1)),
        y: Math.round(Math.random() * (dimension - 1))
      };

      onSnake = this.snakeIsOnCoordinate(dot);
    }

    this.setState({
      dot
    }, this.setInterval);
  }

  setInterval = () => {
    if (this.interval != null) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(this.step, Game.baseStepSpeed - (this.state.snake.length * 2));
  }

  snakeIsOnCoordinate = (coordinatesToCheck) => this.state.snake.some(coordinates => this.compareCoordinates(coordinates, coordinatesToCheck))

  outOfBounds = x => x >= this.state.screen.dimension || x < 0;

  checkDead = (headCoordinates) => (this.outOfBounds(headCoordinates.x) || this.outOfBounds(headCoordinates.y) || this.snakeIsOnCoordinate(headCoordinates)) && (this.state.direction.x !== 0 || this.state.direction.y !== 0);

  caughtDot = (dot) => this.compareCoordinates(dot, this.state.dot);

  compareCoordinates = (a, b) => a.x === b.x && a.y === b.y;

  reset = () => {
    this.setState(Game.initalState, () => {
      this.step();
      this.setInterval();
    });
  }

  handleStateChange = (state) => {
    this.setState(() => state);
  }

  render() {
    const { screen: { height, width, verticalMargin, horizontalMargin, gridSize }, snake, dot } = this.state;

    return (
      <div>
        SCORE {(snake.length - 2) * 50 * Math.pow(1.05, snake.length - 2)}
        {this.props.test}
        <div className='game' style={{ height, width, margin: `${verticalMargin}px ${horizontalMargin}px 0px` }}>
          <Grid {...{ gridSize }}  />
          <Snake {...{ gridSize, snake }}  />
          <Dot coordinates={dot} gridSize={gridSize} />
        </div>
      </div>
    );
  }
}
