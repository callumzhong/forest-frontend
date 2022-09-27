import getRandomNumber from 'utils/getRandomNumber';
import withGrid from 'utils/withGrid';
import GameObject from './GameObject';

class Bait extends GameObject {
  constructor(config) {
    super(config);
    this.hasCast = false;
  }

  cast(state = {}) {
    if (this.hasCast) return;
    const randomNumber = getRandomNumber(2, 6);
    if (
      state.direction === 'left' ||
      state.direction === 'down'
    ) {
      this.x = state.x - withGrid(randomNumber);
      this.y = state.y;
    }
    if (
      state.direction === 'right' ||
      state.direction === 'up'
    ) {
      this.x = state.x + withGrid(randomNumber);
      this.y = state.y;
    }
    this.hasCast = true;
  }

  pickUp() {
    this.x = withGrid(9999);
    this.y = withGrid(9999);
    this.hasCast = false;
  }
}

export default Bait;
