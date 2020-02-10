
'use strict';

goog.provide('Blockly.JavaScript.nowcodingMaze');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['turn'] = function (block) {
  // Flow statements: turn left, turn right
  switch (block.getFieldValue('FLOW')) {
    case 'TURNLEFT':
      return 'turn("left");\n';
    case 'TURNRIGHT':
      return 'turn("right");\n';
  }
  throw Error('Unknown flow statement.');
};


Blockly.JavaScript['turnAngle'] = function (block) {
  // Flow statements: turn left, turn right
  switch (block.getFieldValue('ANGLE')) {
    case 'TURNLEFT90':
      return 'turnLeft(90);\n';
    case 'TURNRIGHT90':
      return 'turnRight(90);\n';
    case 'TURNLEFT45':
      return 'turnLeft(45);\n';
    case 'TURNRIGHT45':
      return 'turnRight(45);\n';
    case 'TURN180':
      return 'turnRight(180);\n';
  }
  throw Error('Unknown flow statement.');
};



Blockly.JavaScript['moveForward'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'moveForward();\n';
  return code;
};



Blockly.JavaScript['maze_path_default'] = function (block) {
  var code = block.getFieldValue('PATH')

  switch (code) {
    case 'TURNLEFT':
      code = '"left"';
      break;
    case 'TURNRIGHT':
      code = '"right"';
      break;
  }

  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['logic_maze_turn_piece'] = function (block) {
  var OBJECT = {
    'LEFT': '"left"',
    'RIGHT': '"right"'
  };
  var code = OBJECT[block.getFieldValue('LOGIC_MAZE_TURN_PIECE')];
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};







Blockly.JavaScript['maze_turn_piece'] = function (block) {
  // Print statement.
  var msg = Blockly.JavaScript.valueToCode(block, 'MAZE_TURN_PIECE',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return 'turn(' + msg + ');\n';
};













Blockly.JavaScript['logic_maze_path_check_1_condition'] = function (block) {
  var OBJECT = {
    'PATH_AHEAD': 'checkPath("path_ahead")',
    'PATH_LEFT': 'checkPath("path_left")',
    'PATH_RIGHT': 'checkPath("path_right")'
  };
  var code = OBJECT[block.getFieldValue('LOGIC_MAZE_PATH_CHECK_1_CONDITION')];
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['logic_maze_path_check_2_condition'] = function (block) {
  var OBJECT = {
    'PATH_CROSSROAD': 'checkPath("path_crossroad")',
    'AHEAD_AND_RIGHT': 'checkPath("ahead_and_right")',
    'AHEAD_AND_LEFT': 'checkPath("ahead_and_left")',
    'RIGHT_AND_LEFT': 'checkPath("right_and_left")',
    'RIGHT_45': 'checkPath("right_45")',
    'LEFT_45': 'checkPath("left_45")'
  };
  var code = OBJECT[block.getFieldValue('LOGIC_MAZE_PATH_CHECK_2_CONDITION')];
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};








Blockly.JavaScript['controls_until_maze_nowcoding'] = function (block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';

  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);

  return 'while (checkGoal()) {\n' + branch + '}\n';
};

Blockly.JavaScript['controls_ifelse_maze_nowcoding'] = Blockly.JavaScript['controls_if_maze_nowcoding'] = Blockly.JavaScript['controls_if'];
