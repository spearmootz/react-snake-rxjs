import Rx from 'rxjs';

const mapKeys = key => {
  switch (key) {
    case ('w'):
    case ('arrowup'):
      return {
        x: 0,
        y: -1
      }

    case 'a':
    case 'arrowleft':
      return {
        x: -1,
        y: 0
      }

    case 'd':
    case 'arrowright':
      return {
        x: 1,
        y: 0
      }


    case 's':
    case 'arrowdown':
      return {
        x: 0,
        y: 1
      }
    default:
      return null;
  }
};

const compareDirections = (a, b) => a.x === b.x && a.y === b.y;
const getLowercaseKey = e => e.key.toLowerCase();

const direction = new Rx.BehaviorSubject({ x: 0, y: 0 });
let currentDirection = { x: 0, y: 0 };

Rx.Observable.fromEvent(window, 'keydown').map(getLowercaseKey).map(mapKeys).filter(nextDirection => nextDirection !== null).subscribe(nextDirection => {
  if ((nextDirection.x === 0 || currentDirection.x !== nextDirection.x * -1) && (nextDirection.y === 0 || currentDirection.y !== nextDirection.y * -1)) {
    currentDirection = nextDirection;
    direction.next(nextDirection);
  }
});

export default direction;
