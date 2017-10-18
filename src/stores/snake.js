import { action, computed, observable, transaction } from 'mobx';
import Coordinates from './../classes/Coordinates'

export default class SnakeStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable snake = [];

  @computed get length () {
    return this.snake.length;
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
    this.snake.replace(observable.shallowArray([new Coordinates(15, 15)]));
  }

  getNextMove () {
    return new Coordinates(this.rootStore.controls.nextDirection.x + this.snake[0].x, this.rootStore.controls.nextDirection.y + this.snake[0].y)
  }

  snakeOnPosition = (coordinates) => this.snake.some(snakeCoordinate => snakeCoordinate.compare(coordinates));
}
