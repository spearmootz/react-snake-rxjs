import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './Snake.css';

@inject('stores') @observer
export default class Snake extends Component {
  render() {
    const length = this.props.stores.snake.length;
    const snakeDots = [];

    for (let x = 0; x < length; x++) {
      snakeDots.push(<SnakeDot key={x} index={x} />)
    }

    return (
      <div className='snake'>
        {snakeDots}
      </div>
    );
  }
}

@inject('stores') @observer
class SnakeDot extends Component {

  render () {
    const { gridSize } = this.props.stores.dimensions;
    const { x, y } = this.props.stores.snake.snake[this.props.index];

    return (
      <div style={{ height: gridSize , width: gridSize , top: y * gridSize, left: x * gridSize }}></div>
    );
  }
}
