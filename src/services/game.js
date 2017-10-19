import agent from './agent';
import rootStore from './../stores';

class GameService {
  interval = null;
  baseSpeed = 0;

  reset = () => {
    rootStore.controls.reset();
    rootStore.dot.regenerate();
    rootStore.snake.reset();
    this.setInterval();
  }

  setInterval = () => {
    // if (this.interval !== null) {
    //   clearInterval(this.interval);
    // }
    // this.interval = setInterval(this.step, this.baseSpeed - (rootStore.snake.snake.length * 2));
    setTimeout(this.step, this.baseSpeed);
  }

  snakeIsOnCoordinate = (coordinatesToCheck) => rootStore.snake.snake.some((coordinates, index) => index !== 0 && coordinates.compare(coordinatesToCheck))

  outOfBounds = x => x >= rootStore.dimensions.dimension || x < 0;

  checkDead = (headCoordinates) => (this.outOfBounds(headCoordinates.x) || this.outOfBounds(headCoordinates.y) || this.snakeIsOnCoordinate(headCoordinates)) && (rootStore.controls.previousDirection.x !== 0 || rootStore.controls.previousDirection.y !== 0);

  caughtDot = (head) => rootStore.dot.coordinates.compare(head);

  step = () => {
    agent.play();
    const head = rootStore.snake.getNextMove();

    if (this.checkDead(head)) {
      agent.die();
      return this.reset();
    }

    rootStore.snake.move();

    if (this.caughtDot(head)) {
      agent.caught();
      rootStore.dot.regenerate();
      rootStore.score.updateHighScore();
    } else {
      agent.live();
    }
      this.setInterval();
  }
}

const gameService = new GameService();
window.gameService = gameService;
export default gameService;
