import emitter, { eventName } from 'emitter';
import { astar, Graph } from 'javascript-astar';
import calculateDirection from 'utils/calculateDirection';
import nextPosition from 'utils/nextPosition';
import withGrid from 'utils/withGrid';
import LayerEvent from './LayerEvent';

class Layer {
  constructor(config) {
    this.row = config.row;
    this.column = config.column;
    this.map = config.map || null;
    this.gameObjects = config.gameObjects;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.actionSpaces = config.actionSpaces || {};
    this.walls = config.walls || {};
    this.isCutscenePlaying = false;
    this.isAuto = false;
    this.aStarGrid = [];

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

  async openFight() {
    return await new Promise((resolve) => {
      this.autoFight(resolve);
    });
  }

  closeFight() {
    const { hero } = this.gameObjects;
    hero.attack(false);
    Object.values(this.gameObjects).forEach((object) =>
      object.doBehaviorEvent(this),
    );

    emitter.emit(eventName.keyboard, {
      space: true,
      enter: true,
      moving: true,
    });
  }

  changeMap(events) {
    this.startCutscene(events);
  }

  checkForActionCutscene() {
    const { hero } = this.gameObjects;
    let nextCoords = nextPosition(
      hero.x,
      hero.y,
      hero.direction,
    );
    let match = Object.values(this.gameObjects).find(
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
  checkForActionSpaces() {
    const { hero } = this.gameObjects;
    const match = this.actionSpaces[`${hero.x},${hero.y}`];
    console.log(match);
    return match;
  }

  calculateGameObjectPath(resolve, state) {
    const { gameObject } = state;
    const { hero } = this.gameObjects;
    const pos = {
      sx: Math.trunc(hero.x / 48),
      sy: Math.trunc(hero.y / 48),
      ex: 0,
      ey: 0,
    };
    this.aStarGrid = new Array(this.row)
      .fill(0)
      .map(() => new Array(this.column).fill(1));

    Object.keys(this.walls).forEach((key) => {
      let [x, y] = key.split(',');
      x = Math.trunc(x / 48);
      y = Math.trunc(y / 48);
      this.aStarGrid[x][y] = 0;
    });

    const nextCoords = this.detectWall(
      gameObject.x,
      gameObject.y,
    );
    pos.ex = Math.trunc(nextCoords.x / 48);
    pos.ey = Math.trunc(nextCoords.y / 48);

    const graph = new Graph(this.aStarGrid);
    const start = graph.grid[pos.sx][pos.sy];
    const end = graph.grid[pos.ex][pos.ey];
    const result = astar.search(graph, start, end);
    return resolve(result);
  }

  async autoWalking(resolve, reject, state) {
    const { paths } = state;
    const { hero } = this.gameObjects;
    const directions = [];
    let x = Math.trunc(hero.x / 48);
    let y = Math.trunc(hero.y / 48);
    paths.forEach((path) => {
      directions.push(
        calculateDirection(
          { x: x, y },
          { x: path.x, y: path.y },
        ),
      );
      x = path.x;
      y = path.y;
    });
    let isError = '';
    for (let i = 0; i < directions.length; i++) {
      try {
        const event = new LayerEvent({
          map: this,
          event: {
            type: 'walk',
            direction: directions[i],
            who: 'hero',
            isAuto: true,
          },
        });
        await event.init();
      } catch (error) {
        isError = true;
        break;
      }
    }
    if (isError) {
      return reject({
        status: 400,
        message: '尋路 error',
      });
    }

    return resolve();
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
