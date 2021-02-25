import { Map } from 'immutable';

import reducer from './reducer';

describe('reducer', () => {
  it('should have an initial state', () => {
	  const action = {
      type: 'PLACE',
      position: {
	  	x: 3,
	  	y: 3,
	  	f: 'EAST',
	  },
    };
	  const nextState = reducer(undefined, action);
	  expect(nextState).toEqual(Map({
	  	isPlaced: true,
	  	tableSize: Map({
	  		x: 5,
	  		y: 5,
	  	}),
	  	position: Map({ x: 3, y: 3 }),
	  	facing: 'EAST',
	  }));
  });

  it('should handle PLACE command', () => {
    const initialState = Map();
    const action = {
      type: 'PLACE',
      position: {
        x: 3,
        y: 3,
        f: 'EAST',
      },
    };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 3, y: 3 }),
      facing: 'EAST',
    }));
  });

  it('should handle MOVE command', () => {
    const initialState = Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 1, y: 4 }),
      facing: 'NORTH',
    });
    const action = { type: 'MOVE' };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 1, y: 4 }),
      facing: 'NORTH',
    }));
  });

  it('should handle ROTATE command', () => {
    const initialState = Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 1, y: 3 }),
      facing: 'WEST',
    });
    const action = { type: 'ROTATE', direction: 'LEFT' };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 1, y: 3 }),
      facing: 'SOUTH',
    }));
  });
  it('should handle REPORT command', () => {
    const initialState = Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 1, y: 3 }),
      facing: 'NORTH',
    });
    const action = { type: 'REPORT' };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(Map({
      isPlaced: true,
      noOfReports: 1,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 1, y: 3 }),
      facing: 'NORTH',
    }));
  });
});
