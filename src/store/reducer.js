import { Map } from 'immutable';
import {
  place, move, rotate, report,
} from '../app';

export const DEFAULT_STATE = Map();

/**
 * Prepares new state based on the current state and
 * the action to be performed.
 *
 * @param  {Immutable.Map} state
 * @param  {Object} action
 *
 * @return {Immutable.Map}
 */
const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'PLACE':
      return place(state, action.position);
    case 'MOVE':
      return move(state);
    case 'ROTATE':
      return rotate(state, action.direction);
    case 'REPORT':
      return report(state);
    default:
      return state;
  }
};

export default reducer;
