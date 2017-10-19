import { create } from 'mobx-persist';
import ScoreStore from './score';
import SnakeStore from './snake';
import DotStore from './dot';
import DimensionsStore from './dimensions';
import ControlsStore from './controls';

const hydrate = create({
  storage: localStorage
});

class RootStore {
  constructor() {
    this.dimensions = new DimensionsStore(this);
    this.score = new ScoreStore(this);
    hydrate('score', this.score);

    this.snake = new SnakeStore(this);
    this.dot = new DotStore(this);
    this.controls = new ControlsStore(this);
  }
}

const store = window.store = new RootStore();

export default store;
