import reinforce from 'reinforcenode';
import rootStore from './../stores';

const Agent = reinforce.DQNAgent;
let action = 0;
const getState = () => [action, ...rootStore.controls.array(), ...rootStore.snake.array, ...rootStore.dot.array];

const env = {
  getNumStates: function() { return getState().length },
  getMaxNumActions: function() { return 4; }
}

const spec = {
  gama: 0,  // future planning, 1 is plan for super future``
  epsilon: 0.2, //randomness
  numHiddenUnits: 50,
  alpha: 0.01, // learning rate
  experienceAddEvery: 1, //get a sample every so frames
  experienceSize: 20000000, // memory
  learningStepsPerIteration: 100, //more better
 };


const agent =  new Agent(env, spec);
let moves = 0;

agent.play = () => {
  action = agent.act(getState());
  console.log('action', action);
  const move = rootStore.controls.mapKey(rootStore.controls.moveMap[action]);
  moves++;
  rootStore.controls.updateDirection(move);
}

let previousDistance = rootStore.snake.distanceToDot;
agent.live = () => {
  const currentDistance = rootStore.snake.distanceToDot;
  const distanceReinforcement = currentDistance < previousDistance ? 10 : -2;
  previousDistance = currentDistance;
  agent.learn(distanceReinforcement);
}

agent.caught = () => {
  agent.learn(1000);
  previousDistance = rootStore.snake.distanceToDot;
}

agent.die = () => {;
  console.log('snake', rootStore.snake.length, 'score', rootStore.score.score, 'moves', moves);
  moves = 0;
  agent.learn(-1000);
}

agent.save = () => {
  const model = agent.toJSON();
  console.log(model);
};

window.agent = agent;
window.getState = getState;

export default agent;
