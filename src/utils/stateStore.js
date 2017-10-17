import Rx from 'rxjs';
import direction from './direction';
import screen from './screen';

export default Rx.Observable.combineLatest(screen, direction, (screen, direction) => ({ screen, direction }));
