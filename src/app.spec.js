import { Map } from 'immutable';

import {
  move, place, rotate, report,
} from './app';

describe('main commands', () => {
  it('should move one unit North when facing North', () => {
    const state = Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 1, y: 3 }),
      facing: 'NORTH',
    });
    const nextState = move(state);
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

  it('should move one unit South when facing South', () => {
    const state = Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 2, y: 3 }),
      facing: 'SOUTH',
    });
    const nextState = move(state);
    expect(nextState).toEqual(Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 2, y: 2 }),
      facing: 'SOUTH',
    }));
  });

  it('should move one unit EAST when facing EAST', () => {
    const state = Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 2, y: 3 }),
      facing: 'EAST',
    });
    const nextState = move(state);
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

  it('should move one unit WEST when facing WEST', () => {
    const state = Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 2, y: 3 }),
      facing: 'WEST',
    });
    const nextState = move(state);
    expect(nextState).toEqual(Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 1, y: 3 }),
      facing: 'WEST',
    }));
  });

  it('should not move when facing WEST and x is 0', () => {
    const state = Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 0, y: 3 }),
      facing: 'WEST',
    });
    const nextState = move(state);
    expect(nextState).toEqual(Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 0, y: 3 }),
      facing: 'WEST',
    }));
  });

  it('should not move when facing EAST and x is 4', () => {
    const state = Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 4, y: 3 }),
      facing: 'EAST',
    });
    const nextState = move(state);
    expect(nextState).toEqual(Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 4, y: 3 }),
      facing: 'EAST',
    }));
  });

  it('should not move when facing NORTH and y is 4', () => {
    const state = Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 4, y: 4 }),
      facing: 'NORTH',
    });
    const nextState = move(state);
    expect(nextState).toEqual(Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 4, y: 4 }),
      facing: 'NORTH',
    }));
  });

  it('should not move when facing SOUTH and y is 0', () => {
    const state = Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 4, y: 0 }),
      facing: 'SOUTH',
    });
    const nextState = move(state);
    expect(nextState).toEqual(Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 4, y: 0 }),
      facing: 'SOUTH',
    }));
  });

  it('should not move if robot has not been placed', () => {
    const state = Map({
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 3, y: 3 }),
      facing: 'SOUTH',
    });
    const nextState = move(state);
    expect(nextState).toEqual(state);
  });

  it('shoudl placerobot on correct cordinates and direction', () => {
    const state = Map();
    const placeValues = Map({
      x: 1,
      y: 1,
      f: 'WEST',
    });
    const nextState = place(state, placeValues);
    expect(nextState).toEqual(Map({
      isPlaced: true,
      tableSize: Map({
        x: 5,
        y: 5,
      }),
      position: Map({ x: 1, y: 1 }),
      facing: 'WEST',
    }));
  });

  it('should ignore PLACE action if coordinates are invalid', () => {
    const state = Map();
    const placeValuesInvalidX = {
      x: 6,
      y: 1,
      f: 'WEST',
    };
    const placeValuesInvalidY = {
      x: 1,
      y: 9,
      f: 'WEST',
    };
    const nextStateInvalidX = place(state, placeValuesInvalidX);
    const nextStateInvalidY = place(state, placeValuesInvalidY);
    console.log('nextStateInvalidX', nextStateInvalidX);
    expect(nextStateInvalidX).toEqual(state);
    expect(nextStateInvalidY).toEqual(state);
  });

  it('should ignore place action when facing is not WEST, EAST, SOUTH or NORTH ', () => {
    const state = Map();
    const placeValues = {
      x: 1,
      y: 3,
      f: 'MIDDLE',
    };
    const nextState = place(state, placeValues);
    expect(nextState).toEqual(Map());
  });

  it('should report current postion and facing', () => {
    const state = Map({
      isPlaced: true,
      position: Map({ x: 4, y: 3 }),
      facing: 'NORTH',
    });
    const nextState = report(state);
    expect(nextState).toEqual(Map({
      isPlaced: true,
      noOfReports: 1,
      position: Map({ x: 4, y: 3 }),
      facing: 'NORTH',
    }));
  });

  it('should not report current postion if not placed', () => {
    const state = Map({
      position: Map({ x: 1, y: 3 }),
      facing: 'NORTH',
    });
    const nextState = report(state);
    expect(nextState).toEqual(state);
  });

  it('should rotate to West if state is NORTH and action LEFT', () => {
    const state = Map({
      isPlaced: true,
      facing: 'NORTH',
    });
    const nextState = rotate(state, 'LEFT');
    expect(nextState).toEqual(Map({
      isPlaced: true,
      facing: 'WEST',
    }));
  });

  it('should rotate to NORTH if state is WEST and action RIGHT', () => {
    const state = Map({
      isPlaced: true,
      facing: 'WEST',
    });
    const nextState = rotate(state, 'RIGHT');
    expect(nextState).toEqual(Map({
      isPlaced: true,
      facing: 'NORTH',
    }));
  });
});
