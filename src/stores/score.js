import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';

export default class ScoreStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get score () {
    const {  snake } = this.rootStore.snake;
    return Math.round((snake.length - 1) * 50 * Math.pow(1.05, snake.length - 1));
  };

  @persist @observable highScore = 0;

  @action updateHighScore = () => {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
  }
}
