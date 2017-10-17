import { action, observable, computed } from 'mobx';

export default class ScoreStore {
  @observable score = 0;
  @observable highScore = 0;

  @action updateScore = score => {
    this.score = score;
    if (score > this.highScore) {
      this.highScore = score;
    }
  }
}
