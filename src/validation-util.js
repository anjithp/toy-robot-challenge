import { Map } from 'immutable';

const validFacingValues = Map({
  NORTH: true,
  SOUTH: true,
  EAST: true,
  WEST: true,
});

/**
 * Checks if number is not an integer
 *
 * @param  {int}  number
 * @return {Boolean}
 */
const isNotAnInteger = (number) => {
  if (typeof number === 'number' && (number % 1) === 0) {
    return false;
  }
  return true;
};

const isNegativeNumber = (placeValues) => {
  if (placeValues.get('x') < 0 || placeValues.get('y') < 0) {
    return true;
  }
  return false;
};

const areCoordinatesValid = (placeValues, tableSize) => {
  if (placeValues.get('x') > tableSize.get('x')
	|| placeValues.get('y') > tableSize.get('y')) {
    console.log('Invalid coordinate values.');
    return true;
  }
  return false;
};

/**
 * Valdates new position.
 *
 * @param  {Immutable.Map} placeValues
 * @return {Boolean}
 */
const validatePosition = (placeValues, tableSize) => {
  if (isNotAnInteger(placeValues.get('y'))
	   || isNotAnInteger(placeValues.get('x'))
	   || isNegativeNumber(placeValues)
	   ||		areCoordinatesValid(placeValues, tableSize)) {
    return false;
  }
  return true;
};

/**
 * Checks that direction is valid.
 *
 * @param  {Immutable.Map} placeValues
 * @return {Boolean}
 */
const validateDirection = (placeValues) => {
  if (validFacingValues.has(placeValues.get('f'))) {
    return true;
  }
  console.log('Facing must be NORTH, EAST, SOUTH or WEST.');
  return false;
};

/**
 * Validates coordinates and direction.
 *
 * @param  {Immutable.Map} placeValues
 * @return {Boolean}
 */
const arePlaceValuesValid = (placeValues, tableSize) => {
  if (!validateDirection(placeValues)) {
    return false;
  }
  if (!validatePosition(placeValues, tableSize)) {
    return false;
  }
  return true;
};

export default arePlaceValuesValid;
