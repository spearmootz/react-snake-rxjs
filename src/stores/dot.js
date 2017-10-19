import { action, computed, observable } from 'mobx';
import Coordinates from './../classes/Coordinates';

export default class SnakeStore {
  @observable coordinates = {};

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action regenerate = () => {
    let onSnake = true;
    let coordinates;
    while (onSnake) {
      const x = Math.round(Math.random() * (this.rootStore.dimensions.dimension - 1));
      const y = Math.round(Math.random() * (this.rootStore.dimensions.dimension - 1));
      coordinates = new Coordinates(x, y);

      onSnake = this.rootStore.snake.snakeOnPosition(coordinates);
    }

    this.coordinates = coordinates;
  }

  @computed get array () {
    return [this.coordinates.x, this.coordinates.y];
  }

}
