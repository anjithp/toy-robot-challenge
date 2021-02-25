import {
  place, rotate, move, report,
} from './store/action-creators';

/**
 * Parse single command
 *
 * @param  {string} command
 * @return {Array}
 */
const handleSingleCommand = (command) => {
  switch (command) {
    case 'RIGHT':
      return [rotate(command)];
    case 'LEFT':
      return [rotate(command)];
    case 'REPORT':
      return [report()];
    case 'MOVE':
      return [move()];
    default:
      console.log('Illegal command');
      return [];
  }
};

/**
 * Parse comands with arguments. For this simulation, particularly,
 * PLACE command.
 *
 * @param  {String} command
 * @return {Array}
 */
const handleCommandWithArguments = (command) => {
  const [actionType, actionArguments] = command.split(' ');
  const [x, y, f] = actionArguments.split(',');
  if (actionType !== 'PLACE' || actionArguments.split(',').length !== 3) {
    console.log('Did you mean to use PLACE command? If so, please issue the command with correct syntax.');
    return [];
  }
  return [place({
    x: parseInt(x, 10),
    y: parseInt(y, 10),
    f,
  })];
};

/**
 * Parse input command
 *
 * @param  {string} input
 * @return {Array}
 */
const handleInputCommand = (input) => {
  const command = input.toUpperCase().trim();
  if (command.split(' ').length > 1) {
    return handleCommandWithArguments(command);
  }
  return handleSingleCommand(command);
};

export default handleInputCommand;
