import React, { Component } from 'react';
import './Grid.css';

export default class Grid extends Component {

  render() {
    const { gridSize  } = this.props;
    const borderColors = '#fff';

    return (
      <div className='grid' style={{ backgroundSize: `${gridSize }px ${gridSize }px`, backgroundImage: `repeating-linear-gradient(0deg, ${borderColors}, ${borderColors} 1px, transparent 1px, transparent ${gridSize - 1 }px),repeating-linear-gradient(-90deg, ${borderColors}, ${borderColors} 1px, transparent 1px, transparent ${gridSize - 1 }px)` }}>
      </div>
    );
  }
}
