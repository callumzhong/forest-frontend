import LayerEvent from './LayerEvent';
import Sprite from './Sprite';

class GameObject {
  constructor(config) {
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || 'down';
    this.sprite = new Sprite({
      gameObject: this,
      ...config,
    });
    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;
    this.talking = config.talking || [];
  }

  mount(map) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    // 延遲給予 wall 計算
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 20);
  }

  async doBehaviorEvent(map) {
    if (
      map.isCutscenePlaying ||
      this.behaviorLoop.length === 0 ||
      this.isStanding
    ) {
      return;
    }

    let eventConfig =
      this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    const eventHandler = new LayerEvent({
      map,
      event: eventConfig,
    });
    await eventHandler.init();

    this.behaviorLoopIndex += 1;
    if (
      this.behaviorLoopIndex === this.behaviorLoop.length
    ) {
      this.behaviorLoopIndex = 0;
    }

    this.doBehaviorEvent(map);
  }
}

export default GameObject;
