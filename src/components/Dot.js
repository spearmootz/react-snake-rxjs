import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './Dot.css';

@inject('stores') @observer
export default class Dot extends Component {

  render() {
    const { gridSize } = this.props.stores.dimensions;
    const { x, y } = this.props.stores.dot.coordinates;

    return (
      <div className='dot'>
        <div style={{ height: gridSize - 2, width: gridSize - 2, padding: 1, top: y * gridSize, left: x * gridSize }} key={`${x}-${y}-index`}></div>
      </div>
    );
  }
}
