import * as readline from 'readline';
import 'colors';
import prepareStore from './store/store';
import handleInputCommand from './command-parser';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// prepare redux store(for state management)
const store = prepareStore();

console.log('Welcome to robot simulation demo.'.blue);
console.log('');
console.log('Valid commands:'.bold);
console.log('');
console.log('PLACE x,y,f'.bold.underline);
console.log('- x and y are coordinates and f is facing(must be either NORTH, SOUTH, WEST or EAST)');
console.log('MOVE'.bold.underline);
console.log('- move the robot one step in current direction');
console.log('LEFT'.bold.underline);
console.log('- rotate the robot 90 degrees to the left');
console.log('RIGHT'.bold.underline);
console.log('- rotate the robot 90 degrees to the right');
console.log('REPORT'.bold.underline);
console.log('- report current position and facing direction');

console.log();
console.log('----------------------------------------------------------------------------------');
console.log();
console.log('Table size is 5x5');
console.log('Illegal commands are ignored.');
console.log('First command must be PLACE');
console.log();

const handleInput = (input) => {
  const action = handleInputCommand(input);
  action.forEach(store.dispatch);
  rl.prompt();
};

rl
  .on('line', handleInput)
  .on('close', () => {
    console.log('Closing simulation');
    process.exit(0);
  })
  .setPrompt('ToyRobotDemo> ');

rl.prompt();
