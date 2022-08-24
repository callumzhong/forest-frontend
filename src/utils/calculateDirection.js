const calculateDirection = (start, end) => {
  const { x: sx, y: sy } = start;
  const { x: ex, y: ey } = end;
  if (sx > ex) {
    return 'left';
  }
  if (sx < ex) {
    return 'right';
  }
  if (sy > ey) {
    return 'up';
  }
  if (sy < ey) {
    return 'down';
  }
};

export default calculateDirection;
