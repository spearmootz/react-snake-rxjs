import React, { Component } from 'react';
import './Dot.css';

export default class Dot extends Component {

  render() {
    const { coordinates: { x, y }, gridSize } = this.props;

    return (
      <div className='dot'>
        <div style={{ height: gridSize - 2, width: gridSize - 2, padding: 1, top: y * gridSize, left: x * gridSize }} key={`${x}-${y}-index`}></div>
      </div>
    );
  }
}
