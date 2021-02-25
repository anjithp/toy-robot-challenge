## Description

Toy robot simulation helps moving a robot using certain commands. Following are the list of valid commands.

- PLACE X,Y,F - Places the robot based on X,Y coordinats and facing NORTH,SOUTH,EAST or WEST
- MOVE - Moves 1 step in facing direction
- LEFT - Rotates 90 degrees to the left
- RIGHT - Rotates 90 degrees to the right
- REPORT - Reports current position and facing direction

To start playing please issue PLACE command first. All illegal commands/moves are ignored.

## Technology

Following technologies are used for developing this application:

- <a href="https://en.wikipedia.org/wiki/JavaScript">Javascript(ES6)</a>
- <a href="https://nodejs.org/en/">NodeJs</a>
- <a href="https://redux.js.org/">Redux</a>
- <a href="https://github.com/facebook/jest">Jest(for testing)</a>

To enforce Javascript uniform formatting and to detect potential code issues <a href="https://eslint.org/">eslint</a> is used

## Installation

Plese install <a href="https://nodejs.org/">Node.js</a>(minimum supported version is 12) on the machine where the application is being run.

Once Node.js is installed, please go to the root directory and run following command to install dependencies.

```
npm install
```

To run the application issue below command:

```
npm start
```

To run tests issue below command:

```
npm test
```

## Possible enhacements

- more tests
- more validation messages
