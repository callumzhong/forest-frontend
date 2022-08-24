import shadow from 'assets/images/characters/shadow.png';
import withGrid from 'utils/withGrid';

class Sprite {
  constructor(config) {
    this.image = new Image();
    this.image.src = config.src;
    this.isLoaded = false;
    this.image.onload = () => {
      this.isLoaded = true;
    };
    this.useShadow = config.useShadow || false;
    this.width = config.width || 16;
    this.height = config.height || 32;
    this.zoom = config.zoom || 1;
    this.transformX = config.transformX || 0;
    this.transformY = config.transformY || 0;

    this.imageShadow = new Image();
    this.imageShadow.src = shadow;
    this.isLoadedShadow = false;
    this.imageShadow.onload = () => {
      this.isLoadedShadow = true;
    };

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
    };
    this.currentAnimation =
      config.currentAnimation || 'idle-down';
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

    this.transformX = 6;
    this.currentAnimation = key;
    this.currentAnimationFrame = 0;
    this.animationFrameProgress = this.animationFrameLimit;

    if (
      key.includes('fish-left') ||
      key.includes('fish-down')
    ) {
      this.transformX = -22;
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
        this.currentAnimation.includes('fish')
      ) {
        console.log(1);
        //TODO: 計算動作次數觸發完成
        // emitter.emit(eventName.attack, this.gameObject);
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
      isLoadedShadow,
      image,
      imageShadow,
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

    this.useShadow &&
      isLoadedShadow &&
      ctx.drawImage(imageShadow, x, y - 3);
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
