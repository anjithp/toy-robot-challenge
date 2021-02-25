export const move = () => ({
  type: 'MOVE',
});

export const report = () => ({
  type: 'REPORT',
});

export const place = (position) => ({
  type: 'PLACE',
  position,
});

export const rotate = (direction) => ({
  type: 'ROTATE',
  direction,
});
