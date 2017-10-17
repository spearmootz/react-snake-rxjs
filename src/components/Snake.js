import React, { Component } from 'react';
import './Snake.css';

export default class Snake extends Component {

  render() {
    const { gridSize, snake } = this.props;

    return (
      <div className='snake'>
        { snake.map(({ x, y }, index) => (
          <div style={{ height: gridSize , width: gridSize , top: y * gridSize, left: x * gridSize }} key={`${x}-${y}-${index}`}></div>
        ))}
      </div>
    );
  }
}
