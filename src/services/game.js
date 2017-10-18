import rootStore from './../stores';

class GameService {
  interval = null;
  static baseSpeed = 100;

  reset = () => {
    rootStore.controls.reset();
    rootStore.dot.regenerate();
    rootStore.snake.reset();
    this.setInterval();
  }

  setInterval = () => {
    if (this.interval !== null) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(this.step, GameService.baseSpeed - (rootStore.snake.snake.length * 2));
  }

  snakeIsOnCoordinate = (coordinatesToCheck) => rootStore.snake.snake.some((coordinates, index) => index !== 0 && coordinates.compare(coordinatesToCheck))

  outOfBounds = x => x >= rootStore.dimensions.dimension || x < 0;

  checkDead = (headCoordinates) => (this.outOfBounds(headCoordinates.x) || this.outOfBounds(headCoordinates.y) || this.snakeIsOnCoordinate(headCoordinates)) && (rootStore.controls.previousDirection.x !== 0 || rootStore.controls.previousDirection.y !== 0);

  caughtDot = (head) => rootStore.dot.coordinates.compare(head);

  step = () => {
    const head = rootStore.snake.getNextMove();

    if (this.checkDead(head)) {
      return this.reset();
    }

    rootStore.snake.move();

    if (this.caughtDot(head)) {
      rootStore.dot.regenerate();
      rootStore.score.updateHighScore();
      this.setInterval();
    }
  }


}

export default new GameService();
