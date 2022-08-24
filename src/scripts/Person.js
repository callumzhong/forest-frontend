import emitter, { eventName } from 'emitter';
import GameObject from './GameObject';
class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movingProgressRemaining = 0;
    this.isStanding = false;
    this.isPlayerControlled =
      config.isPlayerControlled || false;
    this.directionUpdate = {
      up: ['y', -4],
      down: ['y', 4],
      left: ['x', -4],
      right: ['x', 4],
    };
    this.minAttack = 12;
    this.maxAttack = 20;
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition(state);
      return;
    }
    if (
      !state.map.isCutscenePlaying &&
      this.isPlayerControlled &&
      state.arrow
    ) {
      this.startBehavior(state, {
        type: 'walk',
        direction: state.arrow,
      });
    }

    this.updateSprite(state);
  }

  startBehavior(state, behavior) {
    this.direction = behavior.direction;
    if (behavior.type === 'walk') {
      if (
        state.map.isSpaceTaken(
          this.x,
          this.y,
          this.direction,
        )
      ) {
        behavior.retry &&
          setTimeout(() => {
            this.startBehavior(state, behavior);
          }, 10);

        return;
      }
      this.movingProgressRemaining = 12;
      this.updateSprite();
      state.map.moveWall(this.x, this.y, this.direction);
    }

    if (behavior.type === 'stand') {
      this.isStanding = true;
      setTimeout(() => {
        emitter.emit(eventName.stand, {
          whoId: this.id,
        });
        this.isStanding = false;
      }, behavior.time);
    }
  }

  updatePosition() {
    const [property, change] =
      this.directionUpdate[this.direction];
    this[property] += change;
    this.movingProgressRemaining -= 1;
    if (this.movingProgressRemaining === 0) {
      emitter.emit(eventName.walk, {
        whoId: this.id,
      });
    }
  }

  updateSprite(state = {}) {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation('walk-' + this.direction);
      return;
    }
    if (state.action === 'fish') {
      this.sprite.setAnimation('fish-' + this.direction);
      return;
    }

    this.sprite.setAnimation('idle-' + this.direction);
  }
}

export default Person;
