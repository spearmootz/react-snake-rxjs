import React from 'react';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(props => (
  <div>
    SCORE {props.stores.score.score}
    HighScore {props.stores.score.highScore}
  </div>
)));
