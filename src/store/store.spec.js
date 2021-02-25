import { Map } from 'immutable';

import prepareStore from './store';

describe('store', () => {
  it('Redux store should be configured with correct reducer', () => {
    const store = prepareStore();
    expect(store.getState()).toEqual(Map());
    store.dispatch({
      type: 'PLACE',
      position: {
        x: 2,
        y: 3,
        f: 'EAST',
      },
    });
    expect(store.getState()).toEqual(Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 2, y: 3 }),
      facing: 'EAST',
    }));
  });
});
