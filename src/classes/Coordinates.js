export default class Coordinates {
  static id = 0;

  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.id = Coordinates.id++;
  }

  compare = (coordinates) => this.x === coordinates.x && this.y === coordinates.y;

  distance = ({ x, y }) => Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2))
}
