import emitter, { eventName } from 'emitter';
import oppositeDirection from 'utils/oppositeDirection';
class LayerEvent {
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  stand(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior(
      {
        map: this.map,
      },
      {
        type: 'stand',
        direction: this.event.direction,
        time: this.event.time,
      },
    );

    const completeHandler = (e) => {
      if (e.whoId === this.event.who) {
        emitter.off(eventName.stand, completeHandler);
        resolve();
      }
    };
    emitter.on(eventName.stand, completeHandler);
  }

  walk(resolve, reject) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior(
      {
        map: this.map,
      },
      {
        type: 'walk',
        direction: this.event.direction,
        retry: true,
        isAuto: this.event.isAuto,
        reject,
      },
    );

    const completeHandler = (e) => {
      if (e.whoId === this.event.who) {
        emitter.off(eventName.walk, completeHandler);
        resolve();
      }
    };
    emitter.on(eventName.walk, completeHandler);
  }

  textMessage(resolve) {
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = oppositeDirection(
        this.map.gameObjects['hero'].direction,
      );
    }

    emitter.emit(eventName.textMessage, {
      mode: this.event.mode,
      text: this.event.text,
      actions: this.event.actions || [],
      next: this.event.next,
      onComplete: () => resolve(),
    });
  }

  changeMap(resolve) {
    emitter.emit(eventName.changeMap, {
      type: this.event.type,
      map: this.event.map,
      data: this.event.data,
      onComplete: () => resolve(),
    });
  }

  init() {
    return new Promise((resolve, reject) => {
      this[this.event.type](resolve, reject);
    });
  }
}

export default LayerEvent;
