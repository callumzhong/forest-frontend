import nextPosition from 'utils/nextPosition';
import withGrid from 'utils/withGrid';
import LayerEvent from './LayerEvent';

class Layer {
  constructor(config) {
    this.map = config.map || null;
    this.gameObjects = config.gameObjects;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.actionSpaces = config.actionSpaces || {};
    this.walls = config.walls || {};
    this.isCutscenePlaying = false;
    this.isAuto = false;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;
    this.lowerImage.onload = () => {
      this.isLowerImageLoaded = true;
    };
    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
    this.upperImage.onload = () => {
      this.isUpperImageLoaded = true;
    };
  }

  drawLowerImage(ctx, cameraPerson, centerPoint) {
    this.isLowerImageLoaded &&
      ctx.drawImage(
        this.lowerImage,
        withGrid(centerPoint.x) - cameraPerson.x,
        withGrid(centerPoint.y) - cameraPerson.y,
      );
  }

  drawUpperImage(ctx, cameraPerson, centerPoint) {
    this.isUpperImageLoaded &&
      ctx.drawImage(
        this.upperImage,
        withGrid(centerPoint.x) - cameraPerson.x,
        withGrid(centerPoint.y) - cameraPerson.y,
      );
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = nextPosition(
      currentX,
      currentY,
      direction,
    );
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      const object = this.gameObjects[key];
      object.id = key;
      object.mount(this);
    });
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i = 0; i < events.length; i++) {
      const eventHandler = new LayerEvent({
        event: events[i],
        map: this,
      });
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;

    Object.values(this.gameObjects).forEach((object) =>
      object.doBehaviorEvent(this),
    );
  }

  changeMap(events) {
    this.startCutscene(events);
  }

  checkForTalkCutscene() {
    const match = this.checkForActionSpaces('talk');
    if (match) {
      this.startCutscene(match.talking[0].events);
    }
  }

  checkForFootstepCutscene() {
    const { hero } = this.gameObjects;
    const match =
      this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events);
    }
  }

  checkForActionSpaces(type) {
    const { hero } = this.gameObjects;
    let direction = hero.direction;
    if (direction === 'down') {
      direction = 'left';
    }
    if (direction === 'up') {
      direction = 'right';
    }
    const nextCoords = nextPosition(
      hero.x,
      hero.y,
      direction,
    );

    if (type === 'action') {
      const match =
        this.actionSpaces[
          `${nextCoords.x},${nextCoords.y}`
        ];
      return match;
    }

    if (type === 'talk') {
      const match = Object.values(this.gameObjects).find(
        (object) => {
          return (
            `${object.x},${object.y}` ===
            `${nextCoords.x},${nextCoords.y}`
          );
        },
      );
      if (
        !this.isCutscenePlaying &&
        match &&
        match.talking.length
      ) {
        return match;
      }
    }
  }

  detectWall(x, y) {
    const detected = {};
    const { directionUpdate } = this.gameObjects.hero;
    Object.keys(directionUpdate).forEach((key) => {
      const nextCoords = nextPosition(x, y, key);
      if (!this.walls[`${nextCoords.x},${nextCoords.y}`]) {
        detected.x = nextCoords.x;
        detected.y = nextCoords.y;
      }
    });
    return detected;
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}

export default Layer;
