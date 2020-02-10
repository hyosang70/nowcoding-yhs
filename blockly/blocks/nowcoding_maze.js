/**
 * Nowcoding Customized Maze Blocks
 * 2018-12-25
 * Merry Christmas!
 */

"use strict";

goog.provide("Blockly.Blocks.nowcodingMaze"); // Deprecated
goog.provide("Blockly.Constants.NowcodingMaze");

goog.require("Blockly.Blocks");
// goog.require("Blockly.BlockSvg");
goog.require("Blockly");

//Block types for nowcoding.
//FIXME[17/07/19]: Lee Middlebrook - unused.
var NOW_CODING_BLOCK_TYPE = {
  TEXT_LABEL_DROP_DOWN: "TextLabelDropdown",
  TEXT_LABEL_INPUT_HOLE: "TextLabelInputHole",
  DEFAULT_LOOP: "LoopDefault",
};

//FIXME[17/07/19]: Lee Middlebrook - unused.
var NOW_CODING_INPUT_TYPE = {
  IF_STATEMENT: "IfStatement",
  ELSE_STATEMENT: "ElseStatement",
  DO_STATEMENT: "DoStatement",
  DROP_DOWN: "Dropdown",
  LOGIC_NEGATE: "LogicNegate",
  MATH_DEFAULT: "MathDefault",
  TEXT_LABEL_DROP_DOWN: "TextLabelDropdown"
};

// Turn LEFT/RIGHT !!!!!
Blockly.defineBlocksWithJsonArray([
  // Block for flow statements: left, right
  {
    type: "turn",
    NowCodingBlockType: "TextLabelDropdown",
    message0: "turn %1",
    args0: [
      {
        type: "field_dropdown",
        NowCodingBlockType: "Dropdown",
        name: "FLOW",
        options: [

              [{ "src": "./assets/b_left.svg", "width": 78, "height": 26, "alt": "LEFT" }, "TURNLEFT"],// demos/code/index.html 파일 경로
              [{ "src": "./assets/b_right.svg", "width": 80, "height": 26, "alt": "RIGHT" }, "TURNRIGHT"]// demos/code/index.html 파일 경로
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "%{BKY_PROCEDURES_HUE}",
    tooltip: "%{BKY_TURN_LR_TOOLTIP}",
    helpUrl: "%{BKY_TURN_LR_HELPURL}",
    extensions: ["controls_turn_lr_tooltip"]
  }
]); // END JSON EXTRACT (Do not delete this comment.)


/**
 * Tooltips for the 'turn' block, keyed by FLOW value.
 * @see {Blockly.Extensions#buildTooltipForDropdown}
 * @package
 * @readonly
 */
Blockly.Constants.NowcodingMaze.TURN_TOOLTIPS = {
  "TURNLEFT": "%{BKY_TURN_LR_TOOLTIP_TURNLEFT}",
  "TURNRIGHT": "%{BKY_TURN_LR_TOOLTIP_TURNRIGHT}"
};

Blockly.Extensions.register(
  "controls_turn_lr_tooltip",
  Blockly.Extensions.buildTooltipForDropdown(
    "FLOW",
    Blockly.Constants.NowcodingMaze.TURN_TOOLTIPS
  )
);
















// TURN 90,180....
Blockly.defineBlocksWithJsonArray([
  // Block for flow statements: left, right
  {
    type: "turnAngle",
    NowCodingBlockType: "TextLabelDropdown",
    message0: "turn %1",
    args0: [
      {
        type: "field_dropdown",
        NowCodingBlockType: "Dropdown",
        name: "ANGLE",
        options: [
          [{ "src": "./assets/b_left90.svg", "width": 60, "height": 26, "alt": "TURNLEFT90" }, "TURNLEFT90"],// demos/code/index.html 파일 경로
          [{ "src": "./assets/b_right90.svg", "width": 60, "height": 26, "alt": "TURNRIGHT90" }, "TURNRIGHT90"],// demos/code/index.html 파일 경로
         // [{ "src": "./assets/b_left45.svg", "width": 60, "height": 26, "alt": "TURNLEFT45" }, "TURNLEFT45"],// demos/code/index.html 파일 경로
         // [{ "src": "./assets/b_right45.svg", "width": 60, "height": 26, "alt": "TURNRIGHT45" }, "TURNRIGHT45"],// demos/code/index.html 파일 경로
          [{ "src": "./assets/b_180.svg", "width": 65, "height": 26, "alt": "TURN180" }, "TURN180"]
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "%{BKY_PROCEDURES_HUE}",
    tooltip: "%{BKY_TURN_LR_ANGLE_TOOLTIP}",
    helpUrl: "%{BKY_TURN_LR_ANGLE_HELPURL}",
    extensions: ["controls_turn_lr_angle_tooltip"]
  }
]); // END JSON EXTRACT (Do not delete this comment.)


/**
 * Tooltips for the 'turn' block, keyed by FLOW value.
 * @see {Blockly.Extensions#buildTooltipForDropdown}
 * @package
 * @readonly
 */
Blockly.Constants.NowcodingMaze.TURN_ANGLE_TOOLTIPS = {
  "TURNLEFT90": "%{BKY_TURN_LR_ANGLE_TOOLTIP_TURNLEFT90}",
  "TURNRIGHT90": "%{BKY_TURN_LR_ANGLE_TOOLTIP_TURNRIGHT90}",
  "TURNLEFT45": "%{BKY_TURN_LR_ANGLE_TOOLTIP_TURNLEFT45}",
  "TURNRIGHT45": "%{BKY_TURN_LR_ANGLE_TOOLTIP_TURNRIGHT45}",
  "TURN180": "%{BKY_TURN_LR_ANGLE_TOOLTIP_TURN180}"
};


Blockly.Extensions.register(
  "controls_turn_lr_angle_tooltip",
  Blockly.Extensions.buildTooltipForDropdown(
    "ANGLE",
    Blockly.Constants.NowcodingMaze.TURN_ANGLE_TOOLTIPS
  )
);













Blockly.defineBlocksWithJsonArray([
  // Block for boolean data type: true and false.
  {
    "type": "maze_path_default",
    "NowCodingBlockType": "Dropdown",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "NowCodingBlockType": "Dropdown",
        "name": "PATH",
        "options": [
          // [{ "src": "b_left.svg", "width": 78, "height": 26, "alt": "LEFT" }, "TURNLEFT"],// demos/code/index.html 파일 경로
          // [{ "src": "b_right.svg", "width": 85, "height": 26, "alt": "RIGHT" }, "TURNRIGHT"],// demos/code/index.html 파일 경로
          [{ "src": "./assets/b_left.svg", "width": 78, "height": 26, "alt": "LEFT" }, "TURNLEFT"],
          [{ "src": "./assets/b_right.svg", "width": 85, "height": 26, "alt": "RIGHT" }, "TURNRIGHT"]
        ]
      }
    ],
    "output": null,
    "colour": "%{BKY_PROCEDURES_HUE}",
    "tooltip": "%{BKY_MAZE_PATH_DEFAULT_TOOLTIP}",
    "helpUrl": "%{BKY_MAZE_PATH_DEFAULT_HELPURL}"
  }
]); // END JSON EXTRACT (Do not delete this comment.)


//Dropdown image 이미지 넣는 코드 파일 위치
Blockly.defineBlocksWithJsonArray([
  // Block for boolean data type: true and false.
  {
    "type": "logic_maze_turn_piece",
    "NowCodingBlockType": "Dropdown",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "NowCodingBlockType": "Dropdown",
        "name": "LOGIC_MAZE_TURN_PIECE",
        "options": [
          // ["%{BKY_LOGIC_MAZE_TURN_PIECE_LEFT}", "LEFT"], //텍스트 넣기
          // ["%{BKY_LOGIC_MAZE_TURN_PIECE_RIGHT}", "RIGHT"], //텍스트 넣기
          [{ "src": "./assets/b_left.svg", "width": 78, "height": 26, "alt": "LEFT" }, "LEFT"],// demos/code/index.html 파일 경로
          [{ "src": "./assets/b_right.svg", "width": 85, "height": 26, "alt": "RIGHT" }, "RIGHT"]// demos/code/index.html 파일 경로
          // [{ "src": "./assets/./assets/b_left.svg", "width": 78, "height": 26, "alt": "left" }, "LEFT"],// compress후의 파일 경로
          // [{ "src": "./assets/./assets/b_right.svg", "width": 85, "height": 26, "alt": "right" }, "RIGHT"]// compress후의 파일 경로
        ]
      }
    ],
    "output": "Boolean",
    "colour": "%{BKY_PROCEDURES_HUE}",
    "tooltip": "%{BKY_LOGIC_MAZE_TURN_PIECE_TOOLTIP}",
    "helpUrl": "%{BKY_LOGIC_MAZE_TURN_PIECE_HELPURL}"
  }
]); // END JSON EXTRACT (Do not delete this comment.)










// Blockly.Blocks['moveForward'] = {
//   /**
//    * Block for print statement.
//    * @this Blockly.Block
//    */
//   init: function () {
//     this.jsonInit({
//       "message0": Blockly.Msg['MOVE_FORWARD_TITLE'],
//       "previousStatement": null,
//       "nextStatement": null,
//       "colour": "%{BKY_PROCEDURES_HUE}",
//       "tooltip": Blockly.Msg['MOVE_FORWARD_TOOLTIP'],
//       "helpUrl": Blockly.Msg['MOVE_FORWARD_HELPURL']
//     });
//   }
// };

Blockly.Blocks['moveForward'] = {
  init: function () {
    this.setNowCodingBlockType("TextLabel");

    this.appendDummyInput()
      .appendField(Blockly.Msg['MOVE_FORWARD_TITLE']);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['TEXTS_HUE']);
    this.setTooltip(Blockly.Msg['MOVE_FORWARD_TOOLTIP']);
    this.setHelpUrl(Blockly.Msg['MOVE_FORWARD_HELPURL']);

    // var rootBlock = this.getRootBlock();
    // console.log("root ", rootBlock)

    // this.svgGroup_ = Blockly.utils.createSvgElement('g', {}, null);
    // this.svgGroup_.translate_ = '';

    // this.svgPath_ = Blockly.utils.createSvgElement('path',
    //   { 'class': 'blocklyPath' }, this.svgGroup_);

    // Blockly.utils.createSvgElement('path',
    //   {
    //     'd': 'm0 0H83.8c-1.5 0-2.8 1-3.3 2.4 0 0-.1.3-.1.4-1.2 4-4.9 7-9.3 7-4.3 0-8-2.9-9.2-6.8-.1-.3-.1-.5-.2-.8-.5-1.2-1.8-2.2-3.2-2.2h-8.2c-4.6 0-8.4 3.8-8.4 8.4v39.8c0 4.6 3.8 8.4 8.4 8.4h8.2c1.4 0 2.7.9 3.2 2.2 0 .3.1.5.2.8 1.2 4 4.9 6.8 9.2 6.8 4.4 0 8.1-3 9.3-7l.1-.4c.5-1.4 1.7-2.4 3.3-2.4h165.3c4.6 0 8.4-3.8 8.4-8.4v-39.8c0-4.6-3.8-8.4-8.4-8.4z',
    //     'style': 'fill:#06c56d',
    //     /*'class' : 'addIcon'*/
    //   },
    //   this.svgGroup_);

    // console.log("~~~~~~~~~~~~", this.getSvgRoot().);
    // this.getSvgRoot().appendChild(this.svgGroup_);
  }

};















Blockly.Blocks['maze_turn_piece'] = {
  /**
   * Block for print statement.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg['MAZE_TURN_PIECE_TITLE'],
      "NowCodingBlockType": "TextLabelInputHole",
      "args0": [
        {
          "type": "input_value",
          "NowCodingBlockType": "InputHole",
          "name": "MAZE_TURN_PIECE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": "%{BKY_PROCEDURES_HUE}",
      "tooltip": Blockly.Msg['MAZE_TURN_PIECE_TOOLTIP'],
      "helpUrl": Blockly.Msg['MAZE_TURN_PIECE_HELPURL']
    });
  }
};












Blockly.defineBlocksWithJsonArray([
  // Block for boolean data type: true and false.
  {
    "type": "logic_maze_path_check_1_condition",
    "NowCodingBlockType": "TextLabelDropdownNonEdge",
    "message0": "path %1",
    "args0": [
      {
        "type": "field_dropdown",
        "NowCodingBlockType": "Dropdown",
        "name": "LOGIC_MAZE_PATH_CHECK_1_CONDITION",
        "options": [
          [{ "src": "./assets/b_ahead.svg", "width": 84, "height": 26, "alt": "PATH_AHEAD" }, "PATH_AHEAD"],
          [{ "src": "./assets/b_totheleft.svg", "width": 130, "height": 26, "alt": "PATH_LEFT" }, "PATH_LEFT"],
          [{ "src": "./assets/b_totheright.svg", "width": 141, "height": 26, "alt": "PATH_RIGHT" }, "PATH_RIGHT"],
          // ["%{BKY_LOGIC_MAZE_PATH_CHECK_1_CONDITION_PATH_AHEAD}", "PATH_AHEAD"],
          // ["%{BKY_LOGIC_MAZE_PATH_CHECK_1_CONDITION_PATH_LEFT}", "PATH_LEFT"],
          // ["%{BKY_LOGIC_MAZE_PATH_CHECK_1_CONDITION_PATH_RIGHT}", "PATH_RIGHT"]
        ]
      }
    ],
    "output": "Boolean",
    "colour": "%{BKY_MATH_HUE}",
    "tooltip": "%{BKY_LOGIC_MAZE_PATH_CHECK_1_CONDITION_TOOLTIP}",
    "helpUrl": "%{BKY_LOGIC_MAZE_PATH_CHECK_1_CONDITION_HELPURL}"
  }
]); // END JSON EXTRACT (Do not delete this comment.)


Blockly.defineBlocksWithJsonArray([
  // Block for boolean data type: true and false.
  {
    "type": "logic_maze_path_check_2_condition",
    "NowCodingBlockType": "TextLabelDropdownNonEdge",
    "message0": "path %1",
    "args0": [
      {
        "type": "field_dropdown",
        "NowCodingBlockType": "Dropdown",
        "name": "LOGIC_MAZE_PATH_CHECK_2_CONDITION",
        "options": [
          [{ "src": "./assets/b_crossroad.svg", "width": 115, "height": 26, "alt": "PATH_CROSSROAD" }, "PATH_CROSSROAD"],
          [{ "src": "./assets/b_aheadleft.svg", "width": 218, "height": 26, "alt": "AHEAD_AND_LEFT" }, "AHEAD_AND_LEFT"],
          [{ "src": "./assets/b_aheadright.svg", "width": 220, "height": 26, "alt": "AHEAD_AND_RIGHT" }, "AHEAD_AND_RIGHT"],
          [{ "src": "./assets/b_leftright.svg", "width": 270, "height": 26, "alt": "RIGHT_AND_LEFT" }, "RIGHT_AND_LEFT"]
          //[{ "src": "./assets/b_left45.svg", "width": 60, "height": 26, "alt": "LEFT_45" }, "LEFT_45"],
          //[{ "src": "./assets/b_right45.svg", "width": 60, "height": 26, "alt": "RIGHT_45" }, "RIGHT_45"]
        ]
      }
    ],
    "output": "Boolean",
    "colour": "%{BKY_MATH_HUE}",
    "tooltip": "%{BKY_LOGIC_MAZE_PATH_CHECK_2_CONDITION_TOOLTIP}",
    "helpUrl": "%{BKY_LOGIC_MAZE_PATH_CHECK_2_CONDITION_HELPURL}"
  }
]); // END JSON EXTRACT (Do not delete this comment.)



















Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for 'do while/until' loop.
  {
    "type": "controls_until_maze_nowcoding",
    "NowCodingBlockType": "RepeatUntilHome",
    "message0": "repeat until home %1",
    "args0": [
      {
        "type": "input_dummy",
      }
    ],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_LOOPS_HUE}",
    "helpUrl": "%{BKY_CONTROLS_UNTIL_MAZE_NOWCODING_HELPURL}",
  },
]);  // END JSON EXTRACT (Do not delete this comment.)












//Button operation here for maintainability
const BUTTON_OPERATION_TYPE = {
  ADD: "ADD",
  REMOVE_ELSE: "REMOVE_ELSE",
  REMOVE_ELSE_IF: "REMOVE_ELSE_IF"
};

const BLOCK_TAGS = {
  ELSE: "ELSE",
  ELSE_DO: "ELSE_DO",
  IF: "IF",
  DO: "DO",
};

Blockly.Blocks['controls_if_maze_nowcoding'] = {

  //Added to Block
  elseifCount_: 0,
  elseCount_: 0,

  /**
   * Block for if/elseif/else condition.
   * @this Blockly.Block
   */
  init: function () {

    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    this.elseTextAdded = false;
    var thisBlock = this;

    //TODO[31/07/19]: Lee Middlebrook - this where control buttons should be in and handle by the block
    this.setControlInputButton(BUTTON_OPERATION_TYPE.ADD, "block", null);
    this.setControlBlock();

    // Assign 'this' to a variable for use in the tooltip closure below.
    this.setNowCodingBlockType("IfTextLabelMutator");

    this.appendDummyInput()
        .appendField(Blockly.Msg['CONTROLS_IF_MSG_IF']);
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Msg['LOGIC_HUE']);


    this.appendValueInput('IF0')
      .setCheck('Boolean')
      .setNowCodingBlockType("IfStatement");

    this.appendDummyInput()
      .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.appendStatementInput('DO0')
      //TODO[26/07/19]: Lee Middlebrook -  testing using image fields for Add and remove buttons
      //.appendField(new Blockly.FieldImage( "https://i.imgur.com/vdQpE0C.png", 30, 30, "*", function ()  { this.addElseIf() }.bind(this) ))
      // .appendField(Blockly.Msg.CONTROLS_IF_MSG_DO)
      .setNowCodingBlockType("DoStatement");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);

    this.setTooltip(function () {
      if (!this.elseifCount_ && !this.elseCount_) {
        return Blockly.Msg['CONTROLS_IF_TOOLTIP_1'];
      } else if (!this.elseifCount_ && this.elseCount_) {
        return Blockly.Msg['CONTROLS_IF_TOOLTIP_2'];
      } else if (this.elseifCount_ && !this.elseCount_) {
        return Blockly.Msg['CONTROLS_IF_TOOLTIP_3'];
      } else if (this.elseifCount_ && this.elseCount_) {
        return Blockly.Msg['CONTROLS_IF_TOOLTIP_4'];
      }
      return '';
    }.bind(this));

  },

  /**
   * Create XML to represent the number of else-if and else inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function () {
    if (!this.elseifCount_ && !this.elseCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.elseifCount_) {
      container.setAttribute('elseif', this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('else', 1);
    }
    return container;
  },
  /**
   * Parse XML to restore the else-if and else inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function (xmlElement) {
    this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function (workspace) {
    var containerBlock = workspace.newBlock('controls_if_if');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;
    for (var i = 1; i <= this.elseifCount_; i++) {
      var elseifBlock = workspace.newBlock('controls_if_elseif');
      elseifBlock.initSvg();
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      var elseBlock = workspace.newBlock('controls_if_else');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function (containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    // Count number of inputs.
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    var valueConnections = [null];
    var statementConnections = [null];
    var elseStatementConnection = null;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          this.elseifCount_++;
          valueConnections.push(clauseBlock.valueConnection_);
          statementConnections.push(clauseBlock.statementConnection_);
          break;
        case 'controls_if_else':
          this.elseCount_++;
          elseStatementConnection = clauseBlock.statementConnection_;
          break;
        default:
          throw TypeError('Unknown block type: ' + clauseBlock.type);
      }
      clauseBlock = clauseBlock.nextConnection &&
        clauseBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 1; i <= this.elseifCount_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
    }
    Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function (containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          var inputIf = this.getInput('IF' + i);
          var inputDo = this.getInput('DO' + i);
          clauseBlock.valueConnection_ =
            inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
            inputDo && inputDo.connection.targetConnection;
          i++;
          break;
        case 'controls_if_else':
          var inputDo = this.getInput('ELSE');
          clauseBlock.statementConnection_ =
            inputDo && inputDo.connection.targetConnection;
          break;
        default:
          throw TypeError('Unknown block type: ' + clauseBlock.type);
      }
      clauseBlock = clauseBlock.nextConnection &&
        clauseBlock.nextConnection.targetBlock();
    }
  },

  /**
   * Modify this block to have the correct number of inputs.
   * @this Blockly.Block
   * @private
   */
  updateShape_: function () {
    // Delete everything.
    //[19/07/19]: Lee Middlebrook -
/*
    var inputIfDo = this.getInput('DO0');
    if(inputIfDo && inputIfDo.controlButton )
      if(inputIfDo.controlButton.op === BUTTON_OPERATION_TYPE.ADD)
        inputIfDo.controlButton.dispose();
*/

    if (this.getInput('ELSE')) {
      this.removeInput('ELSE');
    }
    if (this.getInput('ELSE_')) {
      this.removeInput('ELSE_');
    }
    var i = 1;
    while (this.getInput('IF' + i)) {
      this.removeInput('IF' + i);
      this.removeInput('DO' + i);
      i++;
    }
    // Rebuild block.
    for (var i = 1; i <= this.elseifCount_; i++) {
      this.appendValueInput('IF' + i)
        //TODO[26/07/19]: Lee Middlebrook -  testing using image fields for Add and remove buttons
        //.appendField(new Blockly.FieldImage( "https://i.imgur.com/1iImFQQ.png", 30, 30, "*", function ()  { this.removeElseIf() }.bind(this) ))
        .setCheck('Boolean')
        .appendField(Blockly.Msg['CONTROLS_IF_MSG_ELSEIF'])
        .setNowCodingBlockType("IfStatement");

      this.appendStatementInput('DO' + i)
        .appendField(Blockly.Msg['CONTROLS_IF_MSG_DO'])
        .setNowCodingBlockType("DoStatement");
    }

    if (this.elseCount_) {
      this.appendDummyInput('ELSE_')
        //TODO[26/07/19]: Lee Middlebrook -  testing using image fields for Add and remove buttons
        .appendField(Blockly.Msg['CONTROLS_IF_MSG_ELSE'])
      this.appendStatementInput('ELSE')
        .appendField(Blockly.Msg['CONTROLS_IF_MSG_DO'])
        // .appendField(new Blockly.FieldImage( "https://i.imgur.com/1iImFQQ.png", 30, 30, "*", function ()  { this.removeElse() }.bind(this) ))
        .setNowCodingBlockType("ElseStatement");
    }
  },
  // now coding customize
  addElseIf: function (index) {
    if (this.elseCount_ === 0) {
      this.elseCount_++;
      this.update_add_remove_("", index);
    } else {
      this.elseifCount_++;
      this.update_add_remove_(BUTTON_OPERATION_TYPE.ADD, index);
    }
  },
  // now coding customize
  removeElseIf: function (index) {
    // console.log(index);
    if (index == null) {
      index = this.elseifCount_;
    }
    var oldTotal = this.elseifCount_;
    if (this.elseifCount_ == 0) {
      return;
    } else if (this.elseifCount_ == 0) {
      return;
    } else {
      this.elseifCount_--;
    }

    this.update_add_remove_(BUTTON_OPERATION_TYPE.REMOVE_ELSE_IF, index);
  },
  // now coding customize
  removeElse: function (index) {
    this.elseCount_--;
    this.update_add_remove_else();
  },
  // now coding customize
  update_add_remove_: function (buttonOperation, index) {
    var totalElseif = this.elseifCount_;

    var valueConnections = [null];
    var statementConnections = [null];
    var elseStatementConnection = null;

    // 삭제인경우 index는 삭제를 한 elseif의 index 현재는 마지막것만 삭제한다고 가정하고 마지막이 elseif 가 항상 index가 됨
    // In case of delete, index is the index of the deleted elseif. Now suppose that only the last one is deleted, and the last one elseif is always index.
    // 초기상태가 아닌경우 리커넥트 작업을 해야함 : If it is not in the initial state, reconnect operation is required.
    // 리커넥트를 위해선 기존의 커넥트 정보가 있어햐한다 : For the reconnect, existing connect information should exist.
    // 커넥트 정보 저장하기 : Save the connection information
    var inputIf = 0;
    var inputDo = 0;
    var inputDoElse = 0;
    //else if에 대한 블록, 인블 : the else if block,
    // 커넥트 정보 저장 : Save the connection information
    if (buttonOperation === BUTTON_OPERATION_TYPE.REMOVE_ELSE_IF) {
      var tempTotal = totalElseif + 1;
    } else {
      tempTotal = totalElseif;
    }

    for (var i = 1; i <= tempTotal; i++) {
      //FIXME ?? 삭제한 인덱스는 저장하지 않는다. : Deleted indexes are not stored.
      if (buttonOperation === BUTTON_OPERATION_TYPE.REMOVE_ELSE_IF && i == index) {
        continue;
      }
      inputIf = this.getInput('IF' + i);
      inputDo = this.getInput('DO' + i);

      valueConnections.push(inputIf && inputIf.connection.targetConnection);
      statementConnections.push(inputIf && inputDo.connection.targetConnection);
    }
    //else에 대한 블록 --무조건 else가 있기 때문에 가져온다 : Block else - fetch because there is an unconditional else
    inputDoElse = this.getInput('ELSE');
    // 커넥트 정보 저장 : Save the connection information
    elseStatementConnection = inputDoElse && inputDoElse.connection.targetConnection;

    this.updateShape_();

    // 저장된 커넥트 정보를 이용하여 리커넥트하기 : Re-connect using saved connection information
    for (i = 1; i <= totalElseif; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
    }
    if (elseStatementConnection != null) {
      Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
    }
  },
  // now coding customize
  update_add_remove_else: function () {
    var totalElseif = this.elseifCount_;

    var valueConnections = [null];
    var statementConnections = [null];

    var inputIf = 0;
    var inputDo = 0;

    for (var i = 1; i <= totalElseif; i++) {
      inputIf = this.getInput('IF' + i);
      inputDo = this.getInput('DO' + i);
      valueConnections.push(inputIf && inputIf.connection.targetConnection);
      statementConnections.push(inputIf && inputDo.connection.targetConnection);
    }

    this.updateShape_();

    for (i = 1; i <= totalElseif; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
    }
  }
};

Blockly.Blocks['controls_ifelse_maze_nowcoding'] = {
  init: function () {
    this.setNowCodingBlockType("IfElseTextLabelNonMutator");
    this.appendDummyInput()
      .appendField(Blockly.Msg['CONTROLS_IF_MSG_IF']);
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.appendValueInput('IF0')
      .setCheck('Boolean').setNowCodingBlockType("IfStatement");
    this.appendDummyInput()
      .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.appendStatementInput('DO0')
      .appendField(Blockly.Msg.CONTROLS_IF_MSG_DO)
      .setNowCodingBlockType("DoStatement");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);

    this.appendDummyInput('ELSE_')
      .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    this.appendStatementInput('ELSE')
      .appendField(Blockly.Msg.CONTROLS_IF_MSG_DO).setNowCodingBlockType("ElseStatement");

    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(Blockly.Msg.CONTROLS_IF_TOOLTIP_2);
  }

};
