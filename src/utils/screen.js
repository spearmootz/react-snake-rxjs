import Rx from 'rxjs';

const calculateGameProperties = ({ target: { innerHeight, innerWidth } }) => {
  const dimension = 50;
  let length = ((innerWidth < innerHeight ? innerWidth : innerHeight) * 0.9);
  length -= length % 50

  return {
    height: length,
    width: length,
    horizontalMargin: (innerWidth - length) / 2,
    verticalMargin: (innerHeight - length) / 2,
    gridSize: length / dimension,
    dimension
  };
};

const screenSize = new Rx.BehaviorSubject(calculateGameProperties({ target: window }));

Rx.Observable.fromEvent(window, 'resize').map(calculateGameProperties).subscribe(screenSize.next.bind(screenSize));

export default screenSize;
