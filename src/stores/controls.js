import Coordinates from './../classes/Coordinates';

import Rx from 'rxjs';

const mapKeys = key => {
  switch (key) {
    case ('w'):
    case ('arrowup'):
      return new Coordinates(0, -1);

    case 'a':
    case 'arrowleft':
      return new Coordinates(-1, 0);

    case 'd':
    case 'arrowright':
      return new Coordinates(1, 0);

    case 's':
    case 'arrowdown':
      return new Coordinates(0, 1);

    default:
      return null;
  }
};

const getLowercaseKey = e => e.key.toLowerCase();

const controls = Rx.Observable.fromEvent(window, 'keydown').map(getLowercaseKey).map(mapKeys).filter(nextDirection => nextDirection !== null);

export default class Controls {
  nextDirection = new Coordinates(0, 0);
  previousDirection = new Coordinates(0, 0);

  constructor (rootStore) {
    this.rootStore = rootStore;
    controls.subscribe(this.updateDirection);
  }

  updateDirection = direction => {
    if (!this.nextDirection.compare(direction) && !this.previousDirection.compare(direction) && (this.previousDirection.x !== direction.x * -1 || this.previousDirection.y !== direction.y * -1) ) {
      this.nextDirection = direction;
    }
  }

  reset = () => {
    this.nextDirection = new Coordinates(0, 0);
    this.previousDirection = new Coordinates(0, 0);
  }

  moved = () => {
    this.previousDirection = this.nextDirection;
  }
}
