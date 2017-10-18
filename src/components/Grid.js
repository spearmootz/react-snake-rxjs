import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './Grid.css';

@inject('stores') @observer
export default class Grid extends Component {

  render() {
    const { dimensions  } = this.props.stores;
    const borderColors = '#fff';

    return (
      <div className='grid' style={{ backgroundSize: `${dimensions.gridSize }px ${dimensions.gridSize }px`, backgroundImage: `repeating-linear-gradient(0deg, ${borderColors}, ${borderColors} 1px, transparent 1px, transparent ${dimensions.gridSize - 1 }px),repeating-linear-gradient(-90deg, ${borderColors}, ${borderColors} 1px, transparent 1px, transparent ${dimensions.gridSize - 1 }px)` }}>
      </div>
    );
  }
}
