import { action, computed, observable } from 'mobx';
import Rx from 'rxjs';

const screenResize = Rx.Observable.fromEvent(window, 'resize');

export default class Screen {

  constructor (rootStore) {
    this.rootStore = rootStore;
    screenResize.subscribe(this.updateScreenDimensions);
  }

  @observable screenHeight = window.innerHeight
  @observable screenWidth = window.innerWidth
  @observable dimension = 20;

  @computed get gameLength () {
    const length = ((this.screenWidth < this.screenHeight ? this.screenWidth : this.screenHeight) * 0.9);
    return length - (length % this.dimension);
  }

  @computed get area () {
    return this.dimension * this.dimension;
  }

  @computed get horizontalMargin () {
    return (this.screenWidth - this.gameLength) / 2;
  }

  @computed get verticalMargin () {
    return (this.screenHeight - this.gameLength) / 2;
  }

  @computed get gridSize () {
    return this.gameLength / this.dimension;
  }

  @computed get blankState () {
    const state = [];

    for (let x = 0; x < this.area; x++) {
      state.push(0);
    }

    return state;
  }

  getCoordinateIndex = ({ x, y}) => {
    return (y * this.dimension) + x;
  }

  @action updateScreenDimensions = (event) => {
    const { innerWidth, innerHeight } = event.target;
    this.screenWidth = innerWidth;
    this.screenHeight = innerHeight;
  }
}
