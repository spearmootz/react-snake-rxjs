import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './Snake.css';

@inject('stores') @observer
export default class Snake extends Component {

  render() {
    const { gridSize } = this.props.stores.dimensions;

    return (
      <div className='snake'>
        { this.props.stores.snake.snake.map(({ x, y, id }) => (
          <div style={{ height: gridSize , width: gridSize , top: y * gridSize, left: x * gridSize }} key={id}></div>
        ))}
      </div>
    );
  }
}
