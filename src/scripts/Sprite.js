import emitter, { eventName } from 'emitter';
import withGrid from 'utils/withGrid';

class Sprite {
  constructor(config) {
    this.image = new Image();
    this.image.src = config.src;
    this.isLoaded = false;
    this.image.onload = () => {
      this.isLoaded = true;
    };
    this.width = config.width || 16;
    this.height = config.height || 32;
    this.zoom = config.zoom || 1;
    this.transformX = config.transformX || 0;
    this.transformY = config.transformY || 0;
    this.animations = config.animations || {
      'idle-down': [[0, 1]],
      'idle-right': [[0, 0]],
      'idle-up': [[0, 0]],
      'idle-left': [[0, 1]],
      'walk-down': [
        [2, 1],
        [4, 1],
        [6, 1],
        [8, 1],
        [10, 1],
        [12, 1],
      ],
      'walk-right': [
        [2, 0],
        [4, 0],
        [6, 0],
        [8, 0],
        [10, 0],
        [12, 0],
      ],
      'walk-up': [
        [2, 0],
        [4, 0],
        [6, 0],
        [8, 0],
        [10, 0],
        [12, 0],
      ],
      'walk-left': [
        [2, 1],
        [4, 1],
        [6, 1],
        [8, 1],
        [10, 1],
        [12, 1],
      ],
      'fish-left': [
        [12, 7],
        [11, 7],
        [10, 7],
        [9, 7],
        [8, 7],
        [7, 7],
        [6, 7],
        [5, 7],
      ],
      'fish-right': [
        [0, 4],
        [1, 4],
        [2, 4],
        [3, 4],
        [4, 4],
        [4, 4],
        [6, 4],
        [7, 4],
      ],
      'fish-down': [
        [12, 7],
        [11, 7],
        [10, 7],
        [9, 7],
        [8, 7],
        [7, 7],
        [6, 7],
        [5, 7],
      ],
      'fish-up': [
        [0, 4],
        [1, 4],
        [2, 4],
        [3, 4],
        [4, 4],
        [4, 4],
        [6, 4],
        [7, 4],
      ],
      'chop-left': [
        [12, 5],
        [11, 5],
        [10, 5],
        [9, 5],
        [8, 5],
        [7, 5],
        [6, 5],
        [5, 5],
        [4, 5],
        [3, 5],
        [2, 5],
        [1, 5],
        [0, 5],
      ],
      'chop-right': [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
        [4, 2],
        [5, 2],
        [6, 2],
        [7, 2],
        [8, 2],
        [9, 2],
        [10, 2],
        [11, 2],
        [12, 2],
      ],
      'chop-down': [
        [12, 5],
        [11, 5],
        [10, 5],
        [9, 5],
        [8, 5],
        [7, 5],
        [6, 5],
        [5, 5],
        [4, 5],
        [3, 5],
        [2, 5],
        [1, 5],
        [0, 5],
      ],
      'chop-up': [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
        [4, 2],
        [5, 2],
        [6, 2],
        [7, 2],
        [8, 2],
        [9, 2],
        [10, 2],
        [11, 2],
        [12, 2],
      ],
      'mining-left': [
        [12, 6],
        [11, 6],
        [10, 6],
        [9, 6],
        [8, 6],
        [7, 6],
        [6, 6],
        [5, 6],
        [4, 6],
      ],
      'mining-down': [
        [12, 6],
        [11, 6],
        [10, 6],
        [9, 6],
        [8, 6],
        [7, 6],
        [6, 6],
        [5, 6],
        [4, 6],
      ],
      'mining-right': [
        [0, 3],
        [1, 3],
        [2, 3],
        [3, 3],
        [4, 3],
        [5, 3],
        [6, 3],
        [7, 3],
        [8, 3],
      ],
      'mining-up': [
        [0, 3],
        [1, 3],
        [2, 3],
        [3, 3],
        [4, 3],
        [5, 3],
        [6, 3],
        [7, 3],
        [8, 3],
      ],
    };
    this.currentAnimation = 'idle-down';
    this.currentAnimationFrame = 0;

    this.animationFrameLimit =
      config.animationFrameLimit || 6;
    this.animationFrameProgress = this.animationFrameLimit;

    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][
      this.currentAnimationFrame
    ];
  }

  setAnimation(key) {
    if (this.currentAnimation === key) return;

    this.currentAnimation = key;
    this.currentAnimationFrame = 0;
    this.animationFrameProgress = this.animationFrameLimit;
    if (!this.gameObject.isPlayerControlled) return;
    this.transformX = 6;
    if (
      key.includes('fish-left') ||
      key.includes('fish-down')
    ) {
      this.transformX = -24;
    }
    if (
      key.includes('fish-right') ||
      key.includes('fish-up')
    ) {
      this.transformX = 6;
    }
    if (
      key.includes('chop-left') ||
      key.includes('chop-down')
    ) {
      this.transformX = -48;
    }
    if (
      key.includes('mining-left') ||
      key.includes('mining-down')
    ) {
      this.transformX = -24;
    }
    if (
      key.includes('chop-right') ||
      key.includes('chop-up')
    ) {
      this.transformX = 32;
    }
    if (
      key.includes('mining-right') ||
      key.includes('mining-up')
    ) {
      this.transformX = 6;
    }
    if (key.includes('walk') || key.includes('idle')) {
      this.width = 16;
    } else {
      this.width = 32;
    }
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      if (
        this.gameObject.id === 'hero' &&
        !this.currentAnimation.includes('walk') &&
        !this.currentAnimation.includes('idle')
      ) {
        const action = this.currentAnimation.split('-')[0];
        emitter.emit(eventName.material, {
          action,
        });
      }
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx, cameraPerson, centerPoint) {
    const {
      width,
      height,
      zoom,
      isLoaded,
      transformX,
      transformY,
      image,
    } = this;

    const [frameX, frameY] = this.frame;
    const x =
      this.gameObject.x +
      withGrid(centerPoint.x) -
      cameraPerson.x;
    const y =
      this.gameObject.y +
      withGrid(centerPoint.y) -
      cameraPerson.y;

    isLoaded &&
      ctx.drawImage(
        image,
        frameX * width,
        frameY * height,
        width,
        height,
        x + transformX,
        y + transformY,
        width * zoom,
        height * zoom,
      );

    this.updateAnimationProgress();
  }
}

export default Sprite;
