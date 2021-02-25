import { Map } from 'immutable';
import arePlaceValuesValid from './validation-util';

export const TABLE_SIZE = Map({
  x: 5,
  y: 5,
});

/**
 * Takes the old state and new placeValues and return newState.
 *
 * @param  {Immutable.Map} state
 * @param  {Object || Immutable.Map} placeValues
 * @return {Immutable.Map}
 */
export const place = (state, placeValues) => {
  const newPlaceValues = Map(placeValues);
  const tableSize = state.get('tableSize', TABLE_SIZE);
  if (!arePlaceValuesValid(newPlaceValues, tableSize)) {
    return state;
  }
  return state
  	.set('isPlaced', true)
  	.set('tableSize', tableSize)
  	.set('position', Map({
  		x: newPlaceValues.get('x'),
  		y: newPlaceValues.get('y'),
  	}))
  	.set('facing', newPlaceValues.get('f'));
};

/**
 * Increases or decreases depending on the change parameter.
 *
 * @param  {String} change
 * @return {Int}
 */
const moveToCorrectPlace = (change, maxValue) => (position) => {
  if (change === 'increase' && position + 1 !== maxValue) {
    return position + 1;
  }
  if (change === 'decrease' && position !== 0) {
    return position - 1;
  }
  console.log('Invalid position values');
  return position;
};

/**
 * Moves the robot one unit in the facing direction as long as the
 * new place is valid.
 *
 * @param  {Immutable.Map} state
 *
 * @return {Immutable.Map}
 */
export const move = (state) => {
  if (!state.get('isPlaced')) {
    console.log('Please place robot on the table');
    return state;
  }
  switch (state.get('facing')) {
    case 'NORTH':
      return state.updateIn(['position', 'y'], moveToCorrectPlace('increase', state.getIn(['tableSize', 'y'])));
    case 'SOUTH':
      return state.updateIn(['position', 'y'], moveToCorrectPlace('decrease'));
    case 'EAST':
      return state.updateIn(['position', 'x'], moveToCorrectPlace('increase', state.getIn(['tableSize', 'x'])));
    case 'WEST':
      return state.updateIn(['position', 'x'], moveToCorrectPlace('decrease'));
    default:
      return state;
  }
};

/**
 * Rotates left.
 *
 * @param  {String} facing
 * @return {String}
 */
const rotateLeft = (facing) => {
  switch (facing) {
    case 'NORTH':
      return 'WEST';
    case 'SOUTH':
      return 'EAST';
    case 'EAST':
      return 'NORTH';
    case 'WEST':
      return 'SOUTH';
    default:
      console.log('Invalid facing');
      return null;
  }
};

/**
 * Rotates right.
 *
 * @param  {String} facing
 * @return {String}
 */
const rotateRight = (facing) => {
  switch (facing) {
    case 'NORTH':
      return 'EAST';
    case 'SOUTH':
      return 'WEST';
    case 'EAST':
      return 'SOUTH';
    case 'WEST':
      return 'NORTH';
    default:
      console.log('Invalid facing');
      return null;
  }
};

/**
 * Checks which direction to rotate and calls apropiate function.
 *
 * @param  {String} direction
 * @return {String}
 */
const makeCorrectRotation = (direction) => (facing) => {
  if (direction === 'RIGHT') {
    return rotateRight(facing);
  }
  if (direction === 'LEFT') {
    return rotateLeft(facing);
  }
  return null;
};

/**
 * Rotates the robot with help of makeCorrectRotation.
 * If robot not been placed return old state.
 *
 * @param  {Immutable.Map} state
 * @param  {String} rotateDirection
 * @return {Immutable.Map}
 */
export const rotate = (state, rotateDirection) => {
  if (!state.get('isPlaced')) {
    console.log('I\'m not even on the table');
    return state;
  }
  if (rotateDirection !== 'LEFT' && rotateDirection !== 'RIGHT') {
    return state;
  }
  return state.update('facing', makeCorrectRotation(rotateDirection));
};

/**
 * Reports current robot place if it's been placed on the board.
 *
 * @param  {Immutable.Map} state
 * @return {Immutable.Map}
 */
export const report = (state) => {
  if (!state.get('isPlaced')) {
    return state;
  }
  console.log(`X cordinate is ${state.getIn(['position', 'x'])} and Y is ${state.getIn(['position', 'y'])} and direction is ${state.get('facing')}`);
  return state.update('noOfReports', 0, (oldValue) => oldValue + 1);
};
