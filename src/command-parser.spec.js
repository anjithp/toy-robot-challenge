import handleInputCommand from './command-parser';

describe('Command Parser', () => {
  it('should handle LEFT COMMAND', () => {
    expect(handleInputCommand('LEFT')).toStrictEqual([{ type: 'ROTATE', direction: 'LEFT' }]);
  });
  it('should handle RIGHT COMMAND', () => {
    expect(handleInputCommand('RIGHT')).toStrictEqual([{ type: 'ROTATE', direction: 'RIGHT' }]);
  });
  it('should handle REPORT COMMAND', () => {
    expect(handleInputCommand('REPORT')).toStrictEqual([{ type: 'REPORT' }]);
  });
  it('should handle MOVE COMMAND', () => {
    expect(handleInputCommand('MOVE')).toStrictEqual([{ type: 'MOVE' }]);
  });

  it('should handle PLACE COMMAND', () => {
    expect(handleInputCommand('PLACE 1,3,NORTH')).toStrictEqual([{
      type: 'PLACE',
      position: {
        x: 1, y: 3, f: 'NORTH',
      },
    }]);
  });

  it('should not read empty string', () => {
    expect(handleInputCommand('READ ').length).toBeFalsy();
  });

  it('handles lower case commands', () => {
    expect(handleInputCommand('move')).toStrictEqual([{ type: 'MOVE' }]);
  });
  it('trims trailing spaces', () => {
    expect(handleInputCommand(' right ')).toStrictEqual([{ type: 'ROTATE', direction: 'RIGHT' }]);
  });
  it('ignores other words', () => {
    expect(handleInputCommand('hello').length).toBeFalsy();
  });
  it('ignores PLACE command with only two arguments', () => {
    expect(handleInputCommand('PLACE 1,3').length).toBeFalsy();
  });
});
