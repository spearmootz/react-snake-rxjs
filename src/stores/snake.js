import { action, computed, observable, transaction } from 'mobx';
import Coordinates from './../classes/Coordinates'

export default class SnakeStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable snake = [new Coordinates(Math.round(this.rootStore.dimensions.dimension) / 2, Math.round(this.rootStore.dimensions.dimension) / 2)];

  @computed get length () {
    return this.snake.length;
  }

  @computed get array () {
    const currentState = [...this.rootStore.dimensions.blankState];
    this.snake.forEach(coordinates => currentState[this.rootStore.dimensions.getCoordinateIndex(coordinates)] = 1);

    return [this.snake[0].x, this.snake[0].y];//, ...currentState];
  }

  @computed get distanceToDot () {
    return this.snake[0].distance(this.rootStore.dot.coordinates);
  }

  @action move = () => {
    const head = this.getNextMove();

    transaction(() => {
      this.snake.unshift(head);

      if (!this.rootStore.dot.coordinates.compare(head)) {
        this.snake.pop();
      }
    });

    this.rootStore.controls.moved();
  }

  @action reset = () => {
    const middle = Math.round(this.rootStore.dimensions.dimension) / 2;
    this.snake.replace(observable.shallowArray([new Coordinates(middle, middle)]));
  }

  getNextMove () {
    return new Coordinates(this.rootStore.controls.nextDirection.x + this.snake[0].x, this.rootStore.controls.nextDirection.y + this.snake[0].y)
  }

  snakeOnPosition = (coordinates) => this.snake.some(snakeCoordinate => snakeCoordinate.compare(coordinates));
}
