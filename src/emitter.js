import mitt from 'mitt';
const emitter = mitt();

export const eventName = {
  stand: 'PERSON_STAND_COMPLETE',
  walk: 'PERSON_WALKING_COMPLETE',
  keyboard: 'STOP_KEY_BOARD',
  textMessage: 'TEXT_MESSAGE',
  changeMap: 'CHANGE_MAP',
  material: 'GET_MATERIAL',
};
export default emitter;
