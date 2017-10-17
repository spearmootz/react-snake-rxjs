import ScoreStore from './score';

class RootStore {
  constructor() {
    this.scoreStore = new ScoreStore(this);
  }
}
