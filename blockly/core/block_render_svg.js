/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Methods for graphically rendering a block as SVG.
 * @author fenichel@google.com (Rachel Fenichel)
 */

'use strict';

goog.provide('Blockly.BlockSvg.render');

goog.require('Blockly.BlockSvg');


/**
 * An object that holds information about the paths that are used to render the
 * block.  Each path is built up as an array of steps during the render process.
 * The arrays are then turned into strings, which are set in the block's SVG.
 * @constructor
 * @struct
 * @private
 */
Blockly.BlockSvg.PathObject = function () {
  /**
   * The primary outline of the block.
   * @type {!Array.<string|number>}
   */
  this.steps = [];

  /**
   * The highlight on the primary outline of the block.
   * @type {!Array.<string|number>}
   */
  this.highlightSteps = [];

  /**
   * The holes in the block for inline inputs.
   * @type {!Array.<string|number>}
   */
  this.inlineSteps = [];

  /**
   * The highlights on holes in the block for inline inputs.
   * @type {!Array.<string|number>}
   */
  this.highlightInlineSteps = [];
};

//Thickness of block Inputs, tops/hats
Blockly.BlockSvg.NOWCODING_HEIGHT_Y =  20;

// if-else블록의 do영역 height지정 부분
//if-else statement EMPTY input height
Blockly.BlockSvg.NOWCODING_INPUT_HEIGHT_Y = 20;

Blockly.BlockSvg.NOWCODING_INLINE_DUMMY_W = 20;

Blockly.BlockSvg.NOWCODING_BOTTOM_WRAPPER_WIDTH = 80;

Blockly.BlockSvg.MIN_BLOCK_Y_NOWCODING = 0;

// UI constants for rendering blocks.
/**
 * Horizontal space between elements.
 * if-else블록의 왼쪽 if-else연결되는 왼쪽 영역의 width
 * if-else left of block if-else width of connected left area
 * @const
 */
Blockly.BlockSvg.SEP_SPACE_X = 32;



Blockly.BlockSvg.NOWCODING_MIN_INPUT_NUMBER_WIDTH = 25;

/**
 * Vertical space between elements.
 * if-else블록의 중간중간 seperator영역 height
 * @const
 */
Blockly.BlockSvg.SEP_SPACE_Y = 14; //원본 - Original 20
/**
 * Vertical padding around inline elements.
 * text의 위치인듯?
 * @const
 */
Blockly.BlockSvg.INLINE_PADDING_Y = 0; // 원본 5
/**
 * Minimum height of a block.
 * 블록 height
 * @const
 */
Blockly.BlockSvg.MIN_BLOCK_Y = 25; // 원본 25 - Original 25
/**
 * Height of horizontal puzzle tab.
 * 왼쪽 output연결 되는 부분 // nowcoding 에서 사용안함
 * @const
 */
Blockly.BlockSvg.TAB_HEIGHT = 20;// 원본 20 - Original 20
/**
 * Width of horizontal puzzle tab.
 * 왼쪽 output연결 되는 부분 // nowcoding 에서 사용안함
 * @const
 */
Blockly.BlockSvg.TAB_WIDTH = 8 + Blockly.BlockSvg.NOWCODING_INLINE_DUMMY_W;
/**
 * Width of vertical tab (inc left margin).
 * 위,아래 연결되는 부분의 위치
 * @const
 */
Blockly.BlockSvg.NOTCH_WIDTH = 36; //원본 30
/**
 * Rounded corner radius.
 * @const
 */
//block corner radius.
Blockly.BlockSvg.CORNER_RADIUS = 2; //원본 8
//corner radius를 바꾸면, inlineSteps의 모양이 변경됨. 그러나 v값에서 상수만 조금 조정하면 큰 문제 없이
//corner radius를 전체적으로 변경 가능
Blockly.BlockSvg.CORNER_RADIUS_DUMMY = Blockly.BlockSvg.CORNER_RADIUS + 1;

//TODO[29/07/19]: Lee Middlebrook -  rounded corner for dummy
// Blockly.BlockSvg.CORNER_RADIUS_DUMMY = 10;


/**
 * Do blocks with no previous or output connections have a 'hat' on top?
 * https://github.com/google/blockly/issues/1325 <- hat의 모양 예제
 * @const
 */
Blockly.BlockSvg.START_HAT = false;
/**
 * Height of the top hat.
 * @const
 */
Blockly.BlockSvg.START_HAT_HEIGHT = 15;
/**
 * Path of the top hat's curve.
 * @const
 */
Blockly.BlockSvg.START_HAT_PATH = 'c 30,-' +
  Blockly.BlockSvg.START_HAT_HEIGHT + ' 70,-' +
  Blockly.BlockSvg.START_HAT_HEIGHT + ' 100,0';
/**
 * Path of the top hat's curve's highlight in LTR.
 * @const
 */
Blockly.BlockSvg.START_HAT_HIGHLIGHT_LTR =
  'c 17.8,-9.2 45.3,-14.9 75,-8.7 M 100.5,0.5';
/**
 * Path of the top hat's curve's highlight in RTL.
 * @const
 */
Blockly.BlockSvg.START_HAT_HIGHLIGHT_RTL =
  'm 25,-8.7 c 29.7,-6.2 57.2,-0.5 75,8.7';
/**
 * Distance from shape edge to intersect with a curved corner at 45 degrees.
 * Applies to highlighting on around the inside of a curve.
 * @const
 */
Blockly.BlockSvg.DISTANCE_45_INSIDE = (1 - Math.SQRT1_2) *
  (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + 0.5;
/**
 * Distance from shape edge to intersect with a curved corner at 45 degrees.
 * Applies to highlighting on around the outside of a curve.
 * @const
 */
Blockly.BlockSvg.DISTANCE_45_OUTSIDE = (1 - Math.SQRT1_2) *
  (Blockly.BlockSvg.CORNER_RADIUS + 0.5) - 0.5;
/**
 * SVG path for drawing next/previous notch from left to right.
 * 위아래 연결 블록 파인 홈 왼쪽파트
 * @const
 */
Blockly.BlockSvg.NOTCH_PATH_LEFT = 'l 0,0 6,-6';
// Blockly.BlockSvg.NOTCH_PATH_LEFT = 'q 8 10 15 0';
//Blockly.BlockSvg.NOTCH_PATH_LEFT = 'c1.6,0,2.8,1,3.2,2.5c0.4,1.4,1,2.7,2,3.9c1.9,2.3,4.8,3.5,7.7,3.5c3-0.1,5.8-1.6,7.5-4c1.5-2.1,1.6-5.7,4.9-5.7';
/**
 * SVG path for drawing next/previous notch from left to right with
 * highlighting.
 * 위아래 연결 블록 파인 홈 하이라이트
 * @const
 */
// Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT = 'l 6,4 3,0 6,-4';
Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT = 'l 4,7 10,0 4,-7';
/**
 * SVG path for drawing next/previous notch from right to left.
 * 위아래 연결 블록 파인 홈 오른쪽 파트
 * @const
 */
// Blockly.BlockSvg.NOTCH_PATH_RIGHT = 'l -6,4 -3,0 -6,-4';
Blockly.BlockSvg.NOTCH_PATH_RIGHT = 'q -8 10 -15 0';
Blockly.BlockSvg.NOTCH_PATH_UNDER = 'l 0,0 -6,6';
//Blockly.BlockSvg.NOTCH_PATH_UNDER = 'c-3.3,0-3.4,3.7-4.9,5.7c-1.7,2.4-4.5,3.9-7.4,4c-2.9,0.1-5.8-1.1-7.7-3.3c-0.9-1.1-1.6-2.4-2-3.7c-0.4-1.5-1.7-2.7-3.3-2.7';
/**
 * SVG path for drawing jagged teeth at the end of collapsed blocks.
 * @const
 */
Blockly.BlockSvg.JAGGED_TEETH = 'l 8,0 0,4 8,4 -16,8 8,4';
/**
 * Height of SVG path for jagged teeth at the end of collapsed blocks.
 * @const
 */
Blockly.BlockSvg.JAGGED_TEETH_HEIGHT = 20;
/**
 * Width of SVG path for jagged teeth at the end of collapsed blocks.
 * @const
 */
Blockly.BlockSvg.JAGGED_TEETH_WIDTH = 15;
/**
 * SVG path for drawing a horizontal puzzle tab from top to bottom.
 * @const
 */
Blockly.BlockSvg.TAB_PATH_DOWN = 'v 5 c 0,10 -' + Blockly.BlockSvg.TAB_WIDTH +
  ',-8 -' + Blockly.BlockSvg.TAB_WIDTH + ',7.5 s ' +
  Blockly.BlockSvg.TAB_WIDTH + ',-2.5 ' + Blockly.BlockSvg.TAB_WIDTH + ',7.5';
/**
 * SVG path for drawing a horizontal puzzle tab from top to bottom with
 * highlighting from the upper-right.
 * @const
 */
Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL = 'v 6.5 m -' +
  (Blockly.BlockSvg.TAB_WIDTH * 0.97) + ',3 q -' +
  (Blockly.BlockSvg.TAB_WIDTH * 0.05) + ',10 ' +
  (Blockly.BlockSvg.TAB_WIDTH * 0.3) + ',9.5 m ' +
  (Blockly.BlockSvg.TAB_WIDTH * 0.67) + ',-1.9 v 1.4';

/**
 * SVG start point for drawing the top-left corner.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER_START =
  'm 0,' + Blockly.BlockSvg.CORNER_RADIUS;
/**
 * SVG start point for drawing the top-left corner's highlight in RTL.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL =
  'm ' + Blockly.BlockSvg.DISTANCE_45_INSIDE + ',' +
  Blockly.BlockSvg.DISTANCE_45_INSIDE;
/**
 * SVG start point for drawing the top-left corner's highlight in LTR.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR =
  'm 0.5,' + (Blockly.BlockSvg.CORNER_RADIUS - 0.5);
/**
 * SVG path for drawing the rounded top-left corner.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER =
  'A ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
  Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 ' +
  Blockly.BlockSvg.CORNER_RADIUS + ',0';
/**
 * SVG path for drawing the highlight on the rounded top-left corner.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT =
  'A ' + (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ',' +
  (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ' 0 0,1 ' +
  Blockly.BlockSvg.CORNER_RADIUS + ',0.5';

/**
* SVG path for drawing the rounded top-right corner.
* @const
*/
Blockly.BlockSvg.TOP_RIGHT_CORNER =
  'a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
  Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 ' +
  Blockly.BlockSvg.CORNER_RADIUS + ',' + Blockly.BlockSvg.CORNER_RADIUS;
/**
* SVG path for drawing the highlight on the rounded top-right corner.
* @const
*/
Blockly.BlockSvg.TOP_RIGHT_CORNER_HIGHLIGHT =
  'a ' + (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ',' +
  (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ' 0 0,1 ' +
  Blockly.BlockSvg.CORNER_RADIUS + ',' + (Blockly.BlockSvg.CORNER_RADIUS + 0.5);



/**
* SVG path for drawing the rounded bottom-right corner.
* @const
*/
Blockly.BlockSvg.BOTTOM_RIGHT_CORNER =
  'a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
  Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 -' +
  Blockly.BlockSvg.CORNER_RADIUS + ',' + Blockly.BlockSvg.CORNER_RADIUS;
/**
* SVG path for drawing the highlight on the rounded bottom-right corner.
* @const
*/
Blockly.BlockSvg.BOTTOM_RIGHT_CORNER_HIGHLIGHT =
  'a ' + (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ',' +
  (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ' 0 0,1 -' +
  Blockly.BlockSvg.CORNER_RADIUS + ',' + (Blockly.BlockSvg.CORNER_RADIUS + 0.5);


/**
 * SVG path for drawing the top-left corner of a statement input.
 * Includes the top notch, a horizontal space, and the rounded inside corner.
 * if-else에서 안쪽에 블록 맞춰질 모양의 테두리 //원본 (Blockly.BlockSvg.NOTCH_WIDTH - 10
 * @const
 */
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER =
  Blockly.BlockSvg.NOTCH_PATH_UNDER + ' h -' +
  (Blockly.BlockSvg.NOTCH_WIDTH - 12 - Blockly.BlockSvg.CORNER_RADIUS) +
  ' a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
  Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 -' +
  Blockly.BlockSvg.CORNER_RADIUS + ',' +
  Blockly.BlockSvg.CORNER_RADIUS;
/**
 * SVG path for drawing the bottom-left corner of a statement input.
 * Includes the rounded inside corner.
 * TODO여기 다시해보기
 * @const
 */
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER =
  'a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
  Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
  Blockly.BlockSvg.CORNER_RADIUS + ',' +
  Blockly.BlockSvg.CORNER_RADIUS;
/**
 * SVG path for drawing highlight on the top-left corner of a statement
 * input in RTL.
 * @const
 */
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL =
  'a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
  Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
  (-Blockly.BlockSvg.DISTANCE_45_OUTSIDE - 0.5) + ',' +
  (Blockly.BlockSvg.CORNER_RADIUS -
    Blockly.BlockSvg.DISTANCE_45_OUTSIDE);
/**
 * SVG path for drawing highlight on the bottom-left corner of a statement
 * input in RTL.
 * @const
 */
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL =
  'a ' + (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ',' +
  (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ' 0 0,0 ' +
  (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ',' +
  (Blockly.BlockSvg.CORNER_RADIUS + 0.5);
/**
 * SVG path for drawing highlight on the bottom-left corner of a statement
 * input in LTR.
 * @const
 */
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR =
  'a ' + (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ',' +
  (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ' 0 0,0 ' +
  (Blockly.BlockSvg.CORNER_RADIUS -
    Blockly.BlockSvg.DISTANCE_45_OUTSIDE) + ',' +
  (Blockly.BlockSvg.DISTANCE_45_OUTSIDE + 0.5);


/**
 * SVG path for drawing the top-left corner of a statement input.
 * Includes the top notch, a horizontal space, and the rounded inside corner.
 * if-else에서 안쪽에 블록 맞춰질 모양의 테두리 //원본 (Blockly.BlockSvg.NOTCH_WIDTH - 10
 * @const
 */
Blockly.BlockSvg.INNER_DUMMY_TOP_LEFT_CORNER =
  ' a ' + Blockly.BlockSvg.CORNER_RADIUS_DUMMY + ',' +
  Blockly.BlockSvg.CORNER_RADIUS_DUMMY + ' 0 0,0 -' +
  Blockly.BlockSvg.CORNER_RADIUS_DUMMY + ',' +
  Blockly.BlockSvg.CORNER_RADIUS_DUMMY;

/**
* SVG path for drawing the bottom-left corner of a statement input.
* Includes the rounded inside corner.
* TODO여기 다시해보기
* @const
*/
Blockly.BlockSvg.INNER_DUMMY_BOTTOM_LEFT_CORNER =
  ' a ' + Blockly.BlockSvg.CORNER_RADIUS_DUMMY + ',' +
  Blockly.BlockSvg.CORNER_RADIUS_DUMMY + ' 0 0,0 ' +
  Blockly.BlockSvg.CORNER_RADIUS_DUMMY + ',' +
  Blockly.BlockSvg.CORNER_RADIUS_DUMMY;

/**
* SVG path for drawing the bottom-left corner of a statement input.
* Includes the rounded inside corner.
* TODO여기 다시해보기
* @const
*/
Blockly.BlockSvg.INNER_DUMMY_BOTTOM_RIGHT_CORNER =
  ' a ' + Blockly.BlockSvg.CORNER_RADIUS_DUMMY + ',' +
  Blockly.BlockSvg.CORNER_RADIUS_DUMMY + ' 0 0,0 ' +
  Blockly.BlockSvg.CORNER_RADIUS_DUMMY + ',-' +
  Blockly.BlockSvg.CORNER_RADIUS_DUMMY;

/**
* SVG path for drawing the bottom-left corner of a statement input.
* Includes the rounded inside corner.
* TODO여기 다시해보기
* @const
*/
Blockly.BlockSvg.INNER_DUMMY_TOP_RIGHT_CORNER =
  ' a ' + Blockly.BlockSvg.CORNER_RADIUS_DUMMY + ',' +
  Blockly.BlockSvg.CORNER_RADIUS_DUMMY + ' 0 0,0 -' +
  Blockly.BlockSvg.CORNER_RADIUS_DUMMY + ',-' +
  Blockly.BlockSvg.CORNER_RADIUS_DUMMY;

/**
 *Returns the total number of inputs of a specified type a block has.
 * @param {number} inputType, input type.
 * @return {!number} number of inputs of inputType
 */
Blockly.BlockSvg.prototype.getInputCount = function (inputType) {
  for(var i=0, input, count=0; input = this.inputList[i]; i++) {
    if(input.type == inputType)
      count++;
  }
  return count;
}
/**
 * Returns a bounding box describing the dimensions of this block
 * and any blocks stacked below it.
 * @return {!{height: number, width: number}} Object with height and width
 *    properties in workspace units.
 */
Blockly.BlockSvg.prototype.getHeightWidth = function () {
  var height = this.height;
  var width = this.width;
  // Recursively add size of subsequent blocks.
  var nextBlock = this.getNextBlock();
  if (nextBlock) {
    var nextHeightWidth = nextBlock.getHeightWidth();
    height += nextHeightWidth.height - 4;  // Height of tab. //FIXME: height of NowCoding tab / notch?
    width = Math.max(width, nextHeightWidth.width);
  } else if (!this.nextConnection && !this.outputConnection) {
    // Add a bit of margin under blocks with no bottom tab.
    height += 2;
  }
  return { height: height, width: width };
};

/**
 * Render the block.
 * Lays out and reflows a block based on its contents and settings.
 * @param {boolean=} opt_bubble If false, just render this block.
 *   If true, also render block's parent, grandparent, etc.  Defaults to true.
 */
Blockly.BlockSvg.prototype.render = function (opt_bubble) {
  Blockly.Field.startCache();
  this.rendered = true;

  var cursorX = Blockly.BlockSvg.SEP_SPACE_X;

  if (this.RTL) {
    cursorX = -cursorX;
  }
  // Move the icons into position.
  var icons = this.getIcons();
  for (var i = 0; i < icons.length; i++) {
    cursorX = icons[i].renderIcon(cursorX);
  }
  cursorX += this.RTL ?
    Blockly.BlockSvg.SEP_SPACE_X : -Blockly.BlockSvg.SEP_SPACE_X;
  // If there are no icons, cursorX will be 0, otherwise it will be the
  // width that the first label needs to move over by.

  var inputRows = this.renderCompute_(cursorX);
  // console.log("인풋로우스 - inputRows:", inputRows);
  this.renderDraw_(cursorX, inputRows);
  this.renderMoveConnections_();

  if (opt_bubble !== false) {
    // Render all blocks above this one (propagate a reflow).
    var parentBlock = this.getParent();
    if (parentBlock) {
      parentBlock.render(true);
    } else {
      // Top-most block.  Fire an event to allow scrollbars to resize.
      this.workspace.resizeContents();
    }
  }
  Blockly.Field.stopCache();
};

/**
 * Render a list of fields starting at the specified location.
 * @param {!Array.<!Blockly.Field>} fieldList List of fields.
 * @param {number} cursorX X-coordinate to start the fields.
 * @param {number} cursorY Y-coordinate to start the fields.
 * @return {number} X-coordinate of the end of the field row (plus a gap).
 * @private
 */
Blockly.BlockSvg.prototype.renderFields_ = function (fieldList, cursorX, cursorY, input) {
  //NOWCODING inline field 텍스트 위치 (상하) - Text location
  var fieldY = cursorY + Blockly.BlockSvg.INLINE_PADDING_Y + Blockly.BlockSvg.MIN_BLOCK_Y_NOWCODING / 2;

  if (this.RTL) {
    cursorX = -cursorX;
  }
  for (var t = 0, field; field = fieldList[t]; t++) {
    var root = field.getSvgRoot();
    if (!root) {
      continue;
    }

    //if orientation is set Right-to-Left
    if (this.RTL) {
      cursorX -= field.renderSep + field.renderWidth;
      root.setAttribute('transform','translate(' + cursorX + ',' + fieldY + ')');
      if (field.renderWidth) {
        cursorX -= Blockly.BlockSvg.SEP_SPACE_X;
      }
    } else {

      //FIXME[17/07/19]: Lee Middlebrook - computed transformation of blocks bases on text label...

      // Dropdown으로만 이루어진 input 필드의 경우 좌우 패딩을 없앤다
      //  ~ Removes left and right padding for input fields that are just dropdown
      if (this.NowCodingBlockType === "Dropdown"
        || this.NowCodingBlockType === "LogicNegate"
        || this.NowCodingBlockType === "MathDefault"
        || this.NowCodingBlockType === "LoopDefaultRow") {
        cursorX = cursorX - 30;
      }

      if (this.NowCodingBlockType === "LoopDefault_2") {
        if (field.text_ === "in list") {
          cursorX = cursorX + 10;
        }
        if (field.text_ === "times") {
          cursorX = cursorX + 13;
        }
      }

      if (this.NowCodingBlockType === "LoopDefault_3") {
        if (field.text_ === "from") {
          cursorX = cursorX + 15;
        }
        if (field.text_ === "to") {
          cursorX = cursorX - 20;
        }
        if (field.text_ === "by") {
          cursorX = cursorX - 20;
        }
      }
      //FIXME[19/07/19]: Lee Middlebrook - don't know if this should be ingerated else where...
      //Align fieldlable in verticle center of input field.
      //FIXME[24/07/19]: Lee Middlebrook - Theres gotta be a better way...
      if (this.NowCodingBlockType === "IfTextLabelMutator" || this.NowCodingBlockType === "IfTextLabelNonMutator") {
        var ELSE_IF_LABEL_OFFSET = 8;
        if (this.childBlocks_.length > 0) {
          if (field.text_ === "else if") {
            for(var i=0; i< this.childBlocks_.length; i++) {
              var child = this.childBlocks_[i];
              if(child.NowCodingBlockType === "TextLabelDropdownNonEdge" && input.connection.isConnected()) {
                fieldY += ELSE_IF_LABEL_OFFSET;
                break;
              }
            }
          }
        }
        //update y location for Else fieldLabel
        //FIXME[01/08/19]: Lee Middlebrook - selection based on value.
        if(field.getText() === "else") {
          fieldY -= 2;
        }
      }

      //[15/07/19]: Lee Middlebrook - First place to translate Field labels
      if (this.NowCodingBlockType === "MathDefault") {
        root.setAttribute('transform', 'translate(' + (cursorX + field.renderSep + 5) + ',' + (fieldY + 1) + ')');
      } else {
        root.setAttribute('transform', 'translate(' + (cursorX + field.renderSep + 5) + ',' + fieldY + ')');
      }


      if (field.renderWidth) {
        cursorX += field.renderSep + field.renderWidth +
          Blockly.BlockSvg.SEP_SPACE_X / 1.5; // input text 와 dropdown 사이 간격
      }
    }
  }

  return this.RTL ? -cursorX : cursorX;
};

/**
 * Computes the height and widths for each row and field.
 * @param {number} iconWidth Offset of first row due to icons.
 * @return {!Array.<!Array.<!Object>>} 2D array of objects, each containing
 *     position information.
 * @private
 */
Blockly.BlockSvg.prototype.renderCompute_ = function (iconWidth) {
  var inputList = this.inputList;
  var inputRows = [];
  inputRows.rightEdge = iconWidth + Blockly.BlockSvg.SEP_SPACE_X / 2;
  if (this.previousConnection || this.nextConnection) {
    inputRows.rightEdge = Math.max(inputRows.rightEdge,
      Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.SEP_SPACE_X / 2);
  }
  var fieldValueWidth = 0;  // Width of longest external value field.
  var fieldStatementWidth = 0;  // Width of longest statement field.
  var hasValue = false;
  var hasStatement = false;
  var hasDummy = false;
  var lastType = undefined;
  var isInline = this.getInputsInline() && !this.isCollapsed();

  //custom input values
  var inputMaxWidth;
  var inputMaxRightEdge;
  //

  for (var i = 0, input; input = inputList[i]; i++) {
    if (!input.isVisible()) {
      continue;
    }
    var row;
    /** unchanged from blockly.**/
    if (!isInline || !lastType ||
        lastType == Blockly.NEXT_STATEMENT ||
        input.type == Blockly.NEXT_STATEMENT) {
      // Create new row.
      lastType = input.type;
      row = [];
      if (isInline && input.type != Blockly.NEXT_STATEMENT) {
        row.type = Blockly.BlockSvg.INLINE;
      } else {
        row.type = input.type;
      }
      row.height = 0;
      inputRows.push(row);
    } else {
      row = inputRows[inputRows.length - 1];
    }
    /** **** **/


    row.push(input);
    // Compute minimum input size.
    //NOWCODING 상단 inline Hole (상하) 조정
    //NOWCODING Upper in-line hole (vertical) adjustment
    input.renderHeight = Blockly.BlockSvg.MIN_BLOCK_Y + Blockly.BlockSvg.MIN_BLOCK_Y_NOWCODING ;
    // The width is currently only needed for inline value inputs.
    //NOWCODING 상단 inline Hole (좌우) 조정
    //NOWCODING Upper inline Hole (horizontal) adjustment
    if (isInline && input.type == Blockly.INPUT_VALUE) {
      input.renderWidth = Blockly.BlockSvg.TAB_WIDTH +
        Blockly.BlockSvg.SEP_SPACE_X + Blockly.BlockSvg.NOWCODING_INLINE_DUMMY_W;
    } else {
      input.renderWidth = 0;
    }

    //group length for blocks of same type.

    /*if(input.type === Blockly.INPUT_VALUE) {
      console.log("this:", this, "input", input);
      var nextBlock = this.getNextBlock();
      var previousBlock = this.getPreviousBlock();
      //block added to bottom of block increases size
      //FIXME[01/08/19]: Lee Middlebrook - selecting single input from INPUT_VALUE
      if(previousBlock) {
        console.log("previousBlock:", previousBlock);
        if(previousBlock.inputList[0].renderWidth > input.renderWidth ) {
          console.log("previousBlock >", previousBlock.inputList[0].renderWidth, input.renderWidth);
          input.renderWidth = Math.max(previousBlock.inputList[0].renderWidth, input.renderWidth);
        }
      }

      if(nextBlock) {
        console.log("nextBlock:", nextBlock);
        if(nextBlock.inputList[0].renderWidth > input.renderWidth ) {
          console.log("nextBlock >", nextBlock.inputList[0].renderWidth, input.renderWidth);
          input.renderWidth = Math.max(nextBlock.inputList[0].renderWidth, input.renderWidth);
        }
      }
    }///group lengths*/

    // Expand input size if there is a connection in the input.
    //if input.connection exists and it is connected -> set extents for max of linked block and current input;
    if (input.connection && input.connection.isConnected()) {
      var linkedBlock = input.connection.targetBlock();
      var bBox = linkedBlock.getHeightWidth();
      input.renderHeight = Math.max(input.renderHeight, bBox.height);
      input.renderWidth =  Math.max(input.renderWidth, bBox.width) - Blockly.BlockSvg.NOWCODING_INLINE_DUMMY_W + Blockly.BlockSvg.CORNER_RADIUS;
      inputMaxWidth = bBox;
    }
    // Blocks have a one pixel shadow that should sometimes overhang.
    if (!isInline && i == inputList.length - 1) {
      // Last value input should overhang.
      //input.renderHeight--;  //no for NowCoding??
    } else if (!isInline && input.type == Blockly.INPUT_VALUE &&
      inputList[i + 1] && inputList[i + 1].type == Blockly.NEXT_STATEMENT) {
      // Value input above statement input should overhang.
      input.renderHeight--;
    }

    //if록 Do 영역 높이정의_3 - Defining the Do Area Height _3
    //set the height of the 'C' inputStatement area.
    //FIXME[01/08/19]: Lee Middlebrook - uncouple from "DO" and "ELSE" selection.... Blockly.NEXT_STATEMENT?
    if (input.name.includes("DO") || input.name.includes("ELSE")) {
      input.renderHeight -= (Blockly.BlockSvg.NOWCODING_INPUT_HEIGHT_Y + 4);
    }


    //default blockly code
    row.height = Math.max(row.height, input.renderHeight);
    input.fieldWidth = 0;
    if (inputRows.length == 1) {
      // The first row gets shifted to accommodate any icons.
      input.fieldWidth += this.RTL ? -iconWidth : iconWidth;
    }
    var previousFieldEditable = false;
    for (var j = 0, field; field = input.fieldRow[j]; j++) {
      if (j != 0) {
        input.fieldWidth += Blockly.BlockSvg.SEP_SPACE_X;
      }
      // Get the dimensions of the field.
      var fieldSize = field.getSize();
      field.renderWidth = fieldSize.width;
      field.renderSep = (previousFieldEditable && field.EDITABLE) ?
        Blockly.BlockSvg.SEP_SPACE_X : 0;
      input.fieldWidth += field.renderWidth + field.renderSep;
      row.height = Math.max(row.height, fieldSize.height);
      previousFieldEditable = field.EDITABLE;
    }
    ///default



    // console.log("~~~~~~ this", this);
    // console.log("~~~~~~ this", input);
    // console.log(this.inputList.length)
    // NowCodingBlockType 블록의 두깨를 정의한다.
    // - NowCodingBlockType Defines the width of the block.
    // 블록의 두께 정의_1  - Block thickness of definition_1
    // ifelse 블록 Do 영역 높이정의_1 -  define height of ifelse block Do
    /**
     * Set the Height & Widths of all now coding blocks.
     *  TODO[25/07/19]: Lee Middlebrook - move values to CONSTANTS.
     *  TODO[25/07/19]: Lee Middlebrook - selection by name NowCodingBlockType literal is BAD... change to CONSTANTS.
     *  FIXME[16/07/19]: Lee Middlebrook - this should be separated from block_render_svg...
     */
    if (this.NowCodingBlockType === "TextLabelInputHole" || this.NowCodingBlockType === "TextLabelInputHoleLoop") {
      row.height += 22;
    } else if (this.NowCodingBlockType === "TextLabelDropdown") {
      row.height += 14;
    } else if (this.NowCodingBlockType === "TextLabelDropdownNonEdge") {
      row.height += 8;
    } else if (this.NowCodingBlockType === "TextLabel") {
      //MoveForward~~~의 예제 - MoveForward for Example
      row.height += 14;
    } else if (this.NowCodingBlockType === "Dropdown" || this.NowCodingBlockType === "MathDefault") {
      // Dropdown으로만 이루어진 필드의 경우 좌우 패딩을 없앤다
      //Only with Dropdown Removes left and right padding for fields
      input.fieldWidth += 16;
    } else if (this.NowCodingBlockType === "LogicNegate") {
      // Dropdown으로만 이루어진 필드의 경우 좌우 패딩을 없앤다
      //Only with Dropdown Removes left and right padding for fields
      input.fieldWidth -= 26;
    } else if (this.NowCodingBlockType === "IfElseTextLabelNonMutator") {
      if (input.NowCodingBlockType === "IfStatement") {
        row.height += Blockly.BlockSvg.NOWCODING_HEIGHT_Y;
      } else if (input.NowCodingBlockType === "DoStatement") {
        row.height += Blockly.BlockSvg.NOWCODING_INPUT_HEIGHT_Y;
      } else if (input.NowCodingBlockType === "ElseStatement" || input.name === "ELSE") {
        row.height += Blockly.BlockSvg.NOWCODING_HEIGHT_Y;
      } else if (input.name === "ELSE_") {
        row.height += (Blockly.BlockSvg.NOWCODING_HEIGHT_Y + 7.5);
      }
    } else if (this.NowCodingBlockType === "IfTextLabelMutator") {
      if (input.NowCodingBlockType === "IfStatement") {
        row.height += Blockly.BlockSvg.NOWCODING_HEIGHT_Y;
      } else if (input.NowCodingBlockType === "DoStatement") {
        row.height += Blockly.BlockSvg.NOWCODING_INPUT_HEIGHT_Y;
      } else if (input.NowCodingBlockType === "ElseStatement" || input.name === "ELSE") {
        row.height += Blockly.BlockSvg.NOWCODING_HEIGHT_Y;
      } else if (input.name === "ELSE_") {
        row.height += (Blockly.BlockSvg.NOWCODING_HEIGHT_Y + 7.5);
      }
    } else if (this.NowCodingBlockType === "RepeatUntilHome") {
      if (input.name !== "DO") {
        row.height += Blockly.BlockSvg.NOWCODING_HEIGHT_Y + 2;
      } else if (input.name === "DO") {
        row.height += Blockly.BlockSvg.NOWCODING_INPUT_HEIGHT_Y;
      }
  } else if (this.NowCodingBlockType === "LoopDefault" || this.NowCodingBlockType === "LoopDefault_2" || this.NowCodingBlockType === "LoopDefault_3") {

      if (input.name === "BOOL") {
        row.height += Blockly.BlockSvg.NOWCODING_HEIGHT_Y;
      } else if (input.name === "LIST") {
        row.height += Blockly.BlockSvg.NOWCODING_HEIGHT_Y;
      } else if (input.name === "DO") {
        row.height += Blockly.BlockSvg.NOWCODING_INPUT_HEIGHT_Y;
      } else if (input.name === "TIMES") {
        row.height += Blockly.BlockSvg.NOWCODING_HEIGHT_Y;
      } else if (input.name === "FROM") {
        row.height += Blockly.BlockSvg.NOWCODING_HEIGHT_Y;
      } else if (input.name === "") {
        if (input.fieldRow.length === 3) {
          row.height += Blockly.BlockSvg.NOWCODING_HEIGHT_Y;
        }
      }
    } else if (this.NowCodingBlockType === "ControlsFlowDefault") {

    } else if (this.NowCodingBlockType === "LogicDefaultNoMargin") {
      // row.height -= 3;
    }









    if (row.type != Blockly.BlockSvg.INLINE) {
      if (row.type == Blockly.NEXT_STATEMENT) {
        hasStatement = true;
        fieldStatementWidth = Math.max(fieldStatementWidth, input.fieldWidth);
      } else {
        if (row.type == Blockly.INPUT_VALUE) {
          hasValue = true;
        } else if (row.type == Blockly.DUMMY_INPUT) {
          hasDummy = true;
        }

        if (this.NowCodingBlockType === "Dropdown" || this.NowCodingBlockType === "LogicNegate") {
          // console.log("#######", fieldValueWidth + " " + input.fieldWidth)
          fieldValueWidth = Math.max(fieldValueWidth, input.fieldWidth);
        } else if (this.NowCodingBlockType === "MathDefault") {

          if (this.isShadow_) {
            fieldValueWidth = Math.max(fieldValueWidth, input.fieldWidth) + Blockly.BlockSvg.NOWCODING_MIN_INPUT_NUMBER_WIDTH - 2;
          } else {
            fieldValueWidth = Math.max(fieldValueWidth, input.fieldWidth) + Blockly.BlockSvg.NOWCODING_MIN_INPUT_NUMBER_WIDTH;
          }

        } else {
          fieldValueWidth = Math.max(fieldValueWidth, input.fieldWidth) + Blockly.BlockSvg.NOWCODING_INLINE_DUMMY_W / 2;
        }

      }
    }

  }

  // Make inline rows a bit thicker in order to enclose the values.
  for (var y = 0, row; row = inputRows[y]; y++) {
    row.thicker = false;
    if (row.type == Blockly.BlockSvg.INLINE) {
      for (var z = 0, input; input = row[z]; z++) {
        if (input.type == Blockly.INPUT_VALUE) {
          row.height += 2 * Blockly.BlockSvg.INLINE_PADDING_Y;
          row.thicker = true;
          break;
        }
      }
    }
  }

  // if-else-do에서 do 오른쪽 패딩 - if-else-do in do right padding

  // Compute the statement edge.
  // This is the width of a block where statements are nested.
  inputRows.statementEdge = Blockly.BlockSvg.SEP_SPACE_X + fieldStatementWidth - 4;
  // Compute the preferred right edge.  Inline blocks may extend beyond.
  // This is the width of the block where external inputs connect.
  if (hasStatement) {
    inputRows.rightEdge = Math.max(inputRows.rightEdge,
      inputRows.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH) + Blockly.BlockSvg.NOWCODING_BOTTOM_WRAPPER_WIDTH;


    inputMaxRightEdge = inputRows.rightEdge - 100;
    inputRows.inputMaxRightEdge = inputMaxRightEdge;
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~", inputRows)
    // if (inputMaxRightEdge && inputMaxRightEdge > inputRows.rightEdge) {
    //   inputRows.rightEdge = inputMaxRightEdge;
    // } else if (inputMaxRightEdge && inputMaxRightEdge < inputRows.rightEdge) {
    //   inputMaxRightEdge = inputRows.rightEdge;
    // } else if (!inputMaxRightEdge) {
    //   inputMaxRightEdge = inputRows.rightEdge;
    // }
  }

  ///if-else에서 맨 마지막 row else파트
  if (inputMaxRightEdge) {
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~", inputRows.rightEdge + "  ////  " + inputMaxRightEdge)
    if (inputRows.rightEdge < inputMaxRightEdge) {
      inputRows.rightEdge = inputMaxRightEdge;
      inputRows.inputMaxRightEdge = inputMaxRightEdge;
    } else {
      // console.log("################################")
    }
  }


  if (hasValue) {
    inputRows.rightEdge = Math.max(inputRows.rightEdge, fieldValueWidth +
      Blockly.BlockSvg.SEP_SPACE_X * 2 + Blockly.BlockSvg.TAB_WIDTH);
  } else if (hasDummy) {

    if (this.NowCodingBlockType === "Dropdown" || this.NowCodingBlockType === "LogicNegate" || this.NowCodingBlockType === "MathDefault") {

      if (this.isShadow_) {
        inputRows.rightEdge = Math.max(inputRows.rightEdge, fieldValueWidth + 4);
      } else {
        inputRows.rightEdge = Math.max(inputRows.rightEdge, fieldValueWidth + 4);
      }
    } else {
      inputRows.rightEdge = Math.max(inputRows.rightEdge, fieldValueWidth +
        Blockly.BlockSvg.SEP_SPACE_X + 7); // 오른쪽 edge 패딩 - Right edge padding.
    }

  }

  //blockly original
  inputRows.hasValue = hasValue;
  inputRows.hasStatement = hasStatement;
  inputRows.hasDummy = hasDummy;
  return inputRows;
};


/**
 * Draw the path of the block.
 * Move the fields to the correct locations.
 * @param {number} iconWidth Offset of first row due to icons.
 * @param {!Array.<!Array.<!Object>>} inputRows 2D array of objects, each
 *     containing position information.
 * @private
 */
Blockly.BlockSvg.prototype.renderDraw_ = function (iconWidth, inputRows) {
  this.startHat_ = false;
  // Reset the height to zero and let the rendering process add in
  // portions of the block height as it goes. (e.g. hats, inputs, etc.)
  this.height = 0;
  // Should the top and bottom left corners be rounded or square?
  if (this.outputConnection) {
    this.squareTopLeftCorner_ = false;
    this.squareBottomLeftCorner_ = false;
  } else {
    this.squareTopLeftCorner_ = false;
    this.squareBottomLeftCorner_ = false;
    // If this block is in the middle of a stack, square the corners.
    if (this.previousConnection) {
      var prevBlock = this.previousConnection.targetBlock();
      if (prevBlock && prevBlock.getNextBlock() == this) {
        this.squareTopLeftCorner_ = false;
      }
    } else if (Blockly.BlockSvg.START_HAT) {
      // No output or previous connection.
      this.squareTopLeftCorner_ = false;
      this.startHat_ = true;
      this.height += Blockly.BlockSvg.START_HAT_HEIGHT;
      inputRows.rightEdge = Math.max(inputRows.rightEdge, 100);
    }

    //When connected to the next block, either square left bottom or rounded left bottom
    //다음 블록이랑 연결되었을떄, square left bottom으로 할지, rounded left bottom으로 할지
    if (this.getNextBlock()) {
      this.squareBottomLeftCorner_ = false;
    }
  }


  if (this.NowCodingBlockType === "Dropdown" || this.NowCodingBlockType === "LogicNegate" || this.NowCodingBlockType === "MathDefault") {
    // console.log("#######", inputRows.rightEdge)
    //FIXME[01/08/19]: Lee Middlebrook - delete meee
  }

  // Assemble the block's path.
  /**
   * @type !Blockly.BlockSvg.PathObject
   */
  var pathObject = new Blockly.BlockSvg.PathObject();

  //Draw pathObject clockwise, from Top-Right-Bottom-Left
  this.renderDrawTop_(pathObject, inputRows.rightEdge);

  var cursorY = this.renderDrawRight_(pathObject, inputRows, iconWidth);

  this.renderDrawBottom_(pathObject, cursorY);

  this.renderDrawLeft_(pathObject);

  this.setPaths_(pathObject);
};

/**
 * Update the block's SVG paths based on the paths that were computed during
 * this render pass.
 * @param {!Blockly.BlockSvg.PathObject} pathObject The object containing
 *     partially constructed SVG paths, which will be modified by this function.
 * @private
 */
Blockly.BlockSvg.prototype.setPaths_ = function (pathObject) {
  var pathString = pathObject.steps.join(' ') + '\n' +
    pathObject.inlineSteps.join(' ');
  this.svgPath_.setAttribute('d', pathString);
  //this.svgPathDark_.setAttribute('d', pathString);

  // BLOCKLY ORIGINAL CODE
  // pathString = pathObject.highlightSteps.join(' ') + '\n' +
  //   pathObject.highlightInlineSteps.join(' ');

  // NOWCODING CUSTOMIZED - REMOVE ABOVE CODE


  this.svgPathLight_.setAttribute('d', pathString);
  if (this.RTL) {
    // Mirror the block's path.
    this.svgPath_.setAttribute('transform', 'scale(-1 1)');
    this.svgPathLight_.setAttribute('transform', 'scale(-1 1)');
    //this.svgPathDark_.setAttribute('transform', 'translate(1,1) scale(-1 1)');
  }
};

/**
 * Update all of the connections on this block with the new locations calculated
 * in renderCompute.  Also move all of the connected blocks based on the new
 * connection locations.
 * @private
 */
Blockly.BlockSvg.prototype.renderMoveConnections_ = function () {
  var blockTL = this.getRelativeToSurfaceXY();
  // Don't tighten previous or output connections because they are inferior
  // connections.
  //연결위치를 보여주는 노란색 연결 표시 - Show yellow connection showing connection location
  if (this.previousConnection) {
    this.previousConnection.moveToOffset(blockTL);
  }
  if (this.outputConnection) {
    this.outputConnection.moveToOffset(blockTL);
  }

  for (var i = 0; i < this.inputList.length; i++) {
    var conn = this.inputList[i].connection;
    if (conn) {

      conn.moveToOffset(blockTL);
      //NOWCODING 연결 부분의 y offset -1 - NOWCODING y offset -1
      // if statement inner dummy거나   일반 inner dummy의 경우는 position y offset을 유지
      // if statement inner dummy or normal inner dummy maintain position y offset
      if ((conn.check_ && conn.check_[0] === "Boolean" && conn.type === 1) || conn.type === 1) {
        //FIXME[01/08/19]: Lee Middlebrook - this here for a reason?
      } else {
        conn.y_--;
      }

      //여기는 inner connection일때 불리는 로직 - Here is the logic called at the inner connection
      if (conn.isConnected()) {
        conn.tighten_();
        // conn.sourceBlock_.updateShape_()
        // console.log("!!!!!", conn);
      }
    }
  }
  //여기는 inner가 아니라 같은 레벨상으로 다음 블록 connection일때 불리는 로직.
  //This is the logic that is called on the next block connection on the same level, not inner.
  if (this.nextConnection) {
    this.nextConnection.moveToOffset(blockTL);
    if (this.nextConnection.isConnected()) {
      this.nextConnection.tighten_();
    }
  }
};

/**
 * Render the top edge of the block.
 * @param {!Blockly.BlockSvg.PathObject} pathObject The object containing
 *     partially constructed SVG paths, which will be modified by this function.
 * @param {number} rightEdge Minimum width of block.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawTop_ = function (pathObject, rightEdge) {
  var steps = pathObject.steps;
  var highlightSteps = pathObject.highlightSteps;
  // Position the cursor at the top-left starting point.
  if (this.squareTopLeftCorner_) {
    steps.push('m 0,0');
    highlightSteps.push('m 0.5,0.5');
    if (this.startHat_) {
      steps.push(Blockly.BlockSvg.START_HAT_PATH);
      highlightSteps.push(this.RTL ?
        Blockly.BlockSvg.START_HAT_HIGHLIGHT_RTL :
        Blockly.BlockSvg.START_HAT_HIGHLIGHT_LTR);
    }
  } else {
    steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER_START);
    highlightSteps.push(this.RTL ?
      Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL :
      Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR);
    // Top-left rounded corner.
    steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER);
    highlightSteps.push(Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT);
  }

  // 일반블록+ㄷ블록 Top edge.
  //Normal block + C block Top edge.
  if (this.previousConnection) {
    steps.push('H', Blockly.BlockSvg.NOTCH_WIDTH - 12);
    highlightSteps.push('H', Blockly.BlockSvg.NOTCH_WIDTH - 30);

    steps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT);
    highlightSteps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT);

    var connectionX = (this.RTL ?
      -Blockly.BlockSvg.NOTCH_WIDTH : Blockly.BlockSvg.NOTCH_WIDTH);
    this.previousConnection.setOffsetInBlock(connectionX, 0);
  }

  //FIXME[01/08/19]: Lee Middlebrook - convert to constants.
  //TODO
  if (this.NowCodingBlockType === "Dropdown" || this.NowCodingBlockType === "LogicNegate" || this.NowCodingBlockType === "MathDefault") {
    if (rightEdge == 20) {
      if (this.isShadow_) {
        rightEdge -= Blockly.BlockSvg.CORNER_RADIUS + 1;
      } else {
        rightEdge -= Blockly.BlockSvg.CORNER_RADIUS - 1;
      }
    }
  }

  //Grouping code base on block Type;

  if(this.getInputCount(Blockly.INPUT_VALUE)) {
    steps.push('H', rightEdge);
    highlightSteps.push('H', rightEdge);
  }

  var nextBlock = this.getNextBlock();
  var prevBlock = this.getPreviousBlock();
  var inputCount = this.getInputCount(Blockly.INPUT_VALUE);

  var nWidth = 0;
  var pWidth = 0;

  //get first parent C block in parent block chain.
  var topParentBlock = this.parentHas(Blockly.NEXT_STATEMENT);
  console.log("--topParentBlock:", topParentBlock);

  //if is connected C block.
  if (topParentBlock) {
    //is no next or previous block
    var parentInside = this.isParentInsideInput(Blockly.NEXT_STATEMENT);
    if (parentInside && !this.getInputCount(Blockly.NEXT_STATEMENT)) {
      console.log("Inside connection", parentInside, this);
      // nWidth = this.getWidthByConnection_(nextBlock, false);
      //if this block has a bottom block (nextConnection)
      if (nextBlock) {
        console.log("nextBlock", nextBlock);
        if (inputCount === nextBlock.getInputCount(Blockly.INPUT_VALUE)) {
          nWidth = nextBlock.width;
        }

      } else if (prevBlock) {
        console.log("prevBlock", prevBlock);
        if (inputCount === prevBlock.getInputCount(Blockly.INPUT_VALUE)) {
          pWidth = prevBlock.width;
        }
      }
    } else if (this.getInputCount(Blockly.NEXT_STATEMENT)) {
      console.log("block is C block", this);
    } else {
      console.log("inside connection", parentInside, this);
      if (nextBlock) {
        console.log("nextBlock", nextBlock);
      } else if (prevBlock) {
        console.log("prevBlock", prevBlock);
        pWidth = prevBlock.width;
      }
    }
  } else {
    console.log("topParentBlock:", topParentBlock ,"this", this)
  }

  var largest = Math.max(nWidth, pWidth);
  largest = Math.max(rightEdge, largest);

  console.log("this", this, "done:", this.done, "rightEdge:", rightEdge, "largest:", largest);
  console.log("============================================");

  //if block has no inputs
  if(!this.getInputCount(Blockly.INPUT_VALUE)) {
    steps.push('H', largest);
    highlightSteps.push('H', largest);
  }

  this.width = largest;
};

Blockly.BlockSvg.prototype.isInsideInput = function(type, id) {
  for( var i = 0, input; input = this.inputList[i]; i++) {
    if(input.type === type) {
      if(input.connection) {
        var targetBlock = input.connection.targetBlock();
        if(targetBlock && targetBlock.id === id) {
          return true;
        }
      }
    }
  }
  return false;
};

Blockly.BlockSvg.prototype.isParentInsideInput = function(type) {
  var parent = this.getParent();
  var child = this;
  while(parent) {
    if(parent.isInsideInput(type, child.id)) {
      return true;
    }
    child = parent;
    parent = parent.getParent();
  }

  return false;
}
/**
 * if parent chain has a C block parent, return first occurrence - bottom up
 */
Blockly.BlockSvg.prototype.parentHas = function(parentType) {
  var parent = this.getParent();
  while(parent) {
    if(parent.getInputCount(parentType)/* && this.isInsideInput(parentType, this.id)*/) {
      return parent;
    }
    parent = parent.getParent();
  }
  return null;
};

/**
 * get the width base on the block connections
 * @param {Blockly.BlockSvg} block
 * @param {boolean} prev, is the block tested previous block
 * @return {number} new width of block.
 */
Blockly.BlockSvg.prototype.getWidthByConnection_ = function (block, prev) {

  var blockWidth = 0;
  var inputCount = this.getInputCount(Blockly.INPUT_VALUE);

  //if this block has a bottom block (nextConnection)
  if (block) {
    prev ? console.log("Previous") : console.log("Next");
    console.log("this.InputCount:", inputCount, "block.InputCount:", block.getInputCount(Blockly.INPUT_VALUE));
    //if input values are the same
    if (inputCount === block.getInputCount(Blockly.INPUT_VALUE)) {
      blockWidth = block.width;
    }
    //or if it's a If-Else block (If-Else blocks can have many value inputs but top is only one).
    else if(block.NowCodingBlockType === "IfTextLabelMutator") {
      if(inputCount)
        blockWidth = block.width;
    }

    console.log("Block:", block, "width:", blockWidth);
  }

  return blockWidth;
};

//TODO[15/07/19]: Lee Middlebrook - someone please comment this? custom stuff.
Blockly.BlockSvg.maxCursor;
Blockly.BlockSvg.PrevRowCursorOfElse;
/**
 * Render the right edge of the block.
 * @param {!Blockly.BlockSvg.PathObject} pathObject The object containing
 *     partially constructed SVG paths, which will be modified by this function.
 * @param {!Array.<!Array.<!Object>>} inputRows 2D array of objects, each
 *     containing position information.
 * @param {number} iconWidth Offset of first row due to icons.
 * @return {number} Height of block.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawRight_ = function (pathObject, inputRows, iconWidth) {
  // Objects to pass to helper functions, which encapsulate a lot of the
  // information we're passing around.  Helper functions will update these
  // objects.

  //Cursor position tracking for drawing SVG,
  var cursor = {
    desc: "Current svg cursor position",
    x: 0,
    y: 0
  };

  var connectionPos = {
    x: 0,
    y: 0
  };

  //loop through each input rows,
  for (var y = 0, row; row = inputRows[y]; y++) {
    cursor.x = Blockly.BlockSvg.SEP_SPACE_X;

    if (y == 0) {
      cursor.x += this.RTL ? -iconWidth : iconWidth;
    }

    pathObject.highlightSteps.push('M', (inputRows.rightEdge - 0.5) + ',' + (cursor.y + 0.5));

    if (this.isCollapsed()) {
      this.renderJaggedEdge_(pathObject, row, cursor);
    } else if (row.type == Blockly.BlockSvg.INLINE) {

      // if (input.controlButton) {
      //   console.log("~~~~~~~~~~~~~~~~~~~~~", input)
      //   let cursorX_;
      //   if (input.name === "IF0") {
      //     console.log("~~~~~~~~~~~~~~~~~~~~~", input)
      //   } else {
      //   }
      // }

      this.renderInlineRow_(pathObject, row, cursor, connectionPos, inputRows.rightEdge);

      //Do resize calculation for updated block...
      this.updateInputFieldCoordinate(inputRows, cursor);
      //console.log("row.type == Blockly.BlockSvg.INLINE", "cursor.y:", cursor.y, "row:", row);
      this.updateControlIconInputCoordinate(row, cursor);

      // console.log("~~~~~~~~~~~~~~~~~~~~~~~", );
      //TODO[15/07/19]: Lee Middlebrook - Someone explain this...
      /**
       * Sets the FOOT 'cursor' length PrevRowCursorOfElse
      **/

      if (!Blockly.BlockSvg.PrevRowCursorOfElse) {
          Blockly.BlockSvg.PrevRowCursorOfElse = {};
          Blockly.BlockSvg.PrevRowCursorOfElse[this.id] = {
            x: 0, y: 0
          };
          Blockly.BlockSvg.PrevRowCursorOfElse[this.id].x = cursor.x;
          Blockly.BlockSvg.PrevRowCursorOfElse[this.id].y = cursor.y;
        } else {
          // console.log(Blockly.BlockSvg.PrevRowCursorOfElse.x + " " + cursor.x)
          // if (Blockly.BlockSvg.PrevRowCursorOfElse.x <= cursor.x) {
          //   Blockly.BlockSvg.PrevRowCursorOfElse.x = cursor.x;
          // }
          if (!Blockly.BlockSvg.PrevRowCursorOfElse.hasOwnProperty(this.id)) {
            Blockly.BlockSvg.PrevRowCursorOfElse[this.id] = {
              x: 0, y: 0
            };
          }

          Blockly.BlockSvg.PrevRowCursorOfElse[this.id].x = cursor.x;
          Blockly.BlockSvg.PrevRowCursorOfElse[this.id].y = cursor.y;
        }
      // this.updateInputFieldCoordinate(inputRows, cursor);
    } else if (row.type == Blockly.INPUT_VALUE) {
      // console.log("~~~~~5")
      this.renderExternalValueInput_(pathObject, row, cursor, connectionPos, inputRows.rightEdge);
      this.updateInputFieldCoordinate(inputRows, cursor);

    } else if (row.type == Blockly.DUMMY_INPUT) {
      // console.log("~~~~~6")
      this.renderDummyInput_(pathObject, row, cursor, inputRows.rightEdge, inputRows.hasValue);
      // this.updateControlIconInputCoordinate(inputRows, cursor);
    } else if (row.type == Blockly.NEXT_STATEMENT) {
      // console.log("~~~~~7")
      this.renderStatementInput_(pathObject, row, cursor, connectionPos, inputRows, y);
      //console.log("row.type == Blockly.NEXT_STATEMENT", "cursor.y:", cursor.y, "row:", row);
      this.updateControlIconInputCoordinate(row, cursor);
    }

    //???
    cursor.y += row.height;

    if (!Blockly.BlockSvg.maxCursor) {
      Blockly.BlockSvg.maxCursor = cursor;
    } else {
      if (Blockly.BlockSvg.maxCursor.x < cursor.x) {
        Blockly.BlockSvg.maxCursor = cursor;
      }
    }

  }


  //originial bl
  if (!inputRows.length) {
    cursor.y = Blockly.BlockSvg.MIN_BLOCK_Y;
    pathObject.steps.push('V', cursor.y);
    if (this.RTL) {
      pathObject.highlightSteps.push('V', cursor.y - 1);
    }
  }
  return cursor.y;
};

/**
 * Render the bottom edge of the block.
 * @param {!Blockly.BlockSvg.PathObject} pathObject The object containing
 *     partially constructed SVG paths, which will be modified by this function.
 * @param {number} cursorY Height of block.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawBottom_ = function (pathObject, cursorY) {
  var steps = pathObject.steps;
  var highlightSteps = pathObject.highlightSteps;
  this.height += cursorY;  // Add one for the shadow.

  //일반블록 + ㄷ블록하단 bottom edge
  //normal block + ㄷ Bottom of block edge
  if (this.nextConnection) {
    steps.push('H', (Blockly.BlockSvg.NOTCH_WIDTH - 6 + (this.RTL ? 0.5 : - 0.5)) +
      ' ' + Blockly.BlockSvg.NOTCH_PATH_UNDER);
    // Create next block connection.
    var connectionX;
    if (this.RTL) {
      connectionX = -Blockly.BlockSvg.NOTCH_WIDTH;
    } else {
      connectionX = Blockly.BlockSvg.NOTCH_WIDTH;
    }
    this.nextConnection.setOffsetInBlock(connectionX, cursorY);
    this.height += 4;  // Height of tab.
  }

  // Should the bottom-left corner be rounded or square?
  if (this.squareBottomLeftCorner_) {
    steps.push('H 0');
    if (!this.RTL) {
      highlightSteps.push('M', '0.5,' + (cursorY - 0.5));
    }
  } else {
    steps.push('H', Blockly.BlockSvg.CORNER_RADIUS);
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
      Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 -' +
      Blockly.BlockSvg.CORNER_RADIUS + ',-' +
      Blockly.BlockSvg.CORNER_RADIUS);
    if (!this.RTL) {
      highlightSteps.push('M', Blockly.BlockSvg.DISTANCE_45_INSIDE + ',' +
        (cursorY - Blockly.BlockSvg.DISTANCE_45_INSIDE));
      highlightSteps.push('A', (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ',' +
        (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ' 0 0,1 ' +
        '0.5,' + (cursorY - Blockly.BlockSvg.CORNER_RADIUS));
    }
  }

  //render controlInput button last for Z-index draw order!
  if(this.isControlBlock && this.controlButton.op === BUTTON_OPERATION_TYPE.ADD) {
    this.controlButton.render_();
  }
};

/**
 * Render the left edge of the block.
 * @param {!Blockly.BlockSvg.PathObject} pathObject The object containing
 *     partially constructed SVG paths, which will be modified by this function.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawLeft_ = function (pathObject) {
  var steps = pathObject.steps;
  var highlightSteps = pathObject.highlightSteps;
  if (this.outputConnection) {


    // NOWCODING BLOCKLY ORIGINAL LEFT SIDE CODE
    // // Create output connection.
    // this.outputConnection.setOffsetInBlock(0, 0);
    // steps.push('V', Blockly.BlockSvg.TAB_HEIGHT);
    // steps.push('c 0,-10 -' + Blockly.BlockSvg.TAB_WIDTH + ',8 -' +
    //   Blockly.BlockSvg.TAB_WIDTH + ',-7.5 s ' + Blockly.BlockSvg.TAB_WIDTH +
    //   ',2.5 ' + Blockly.BlockSvg.TAB_WIDTH + ',-7.5');
    // if (this.RTL) {
    //   highlightSteps.push('M', (Blockly.BlockSvg.TAB_WIDTH * -0.25) + ',8.4');
    //   highlightSteps.push('l', (Blockly.BlockSvg.TAB_WIDTH * -0.45) + ',-2.1');
    // } else {
    //   highlightSteps.push('V', Blockly.BlockSvg.TAB_HEIGHT - 1.5);
    //   highlightSteps.push('m', (Blockly.BlockSvg.TAB_WIDTH * -0.92) +
    //     ',-0.5 q ' + (Blockly.BlockSvg.TAB_WIDTH * -0.19) +
    //     ',-5.5 0,-11');
    //   highlightSteps.push('m', (Blockly.BlockSvg.TAB_WIDTH * 0.92) +
    //     ',1 V 0.5 H 1');
    // }

    // NOWCODING CUSTOMIZE - FLATTENDED LEFT SIDE
    if (this.squareTopLeftCorner_) {
      // Statement block in a stack.
      highlightSteps.push('V', 0.5);
    } else {
      highlightSteps.push('V', Blockly.BlockSvg.CORNER_RADIUS);
    }
    this.width += Blockly.BlockSvg.TAB_WIDTH;

  } else if (!this.RTL) {
    if (this.squareTopLeftCorner_) {
      // Statement block in a stack.
      highlightSteps.push('V', 0.5);
    } else {
      highlightSteps.push('V', Blockly.BlockSvg.CORNER_RADIUS);
    }
  }
  steps.push('z');
};

/**
 * Render the jagged edge of an input that shows on a collapsed block.
 * @param {!Blockly.BlockSvg.PathObject} pathObject The object containing
 *     partially constructed SVG paths, which will be modified by this function.
 * @param {!Array.<!Object>} row An object containing position information about
 *     inputs on this row of the block.
 * @param {!Object} cursor An object containing the position of the cursor,
 *     which determines where to start laying out fields.
 * @private
 */
Blockly.BlockSvg.prototype.renderJaggedEdge_ = function (pathObject, row,
  cursor) {
  var steps = pathObject.steps;
  var highlightSteps = pathObject.highlightSteps;
  var input = row[0];
  this.renderFields_(input.fieldRow, cursor.x, cursor.y);
  steps.push(Blockly.BlockSvg.JAGGED_TEETH);
  highlightSteps.push('h 8');
  var remainder = row.height - Blockly.BlockSvg.JAGGED_TEETH_HEIGHT;
  steps.push('v', remainder);
  if (this.RTL) {
    highlightSteps.push('v 3.9 l 7.2,3.4 m -14.5,8.9 l 7.3,3.5');
    highlightSteps.push('v', remainder - 0.7);
  }
  this.width += Blockly.BlockSvg.JAGGED_TEETH_WIDTH;
};

/**
 * Render the right side of an inline row on a block.
 * 블록 안쪽에있는 드랍다운 같은거 -  like the dropdown inside the block
 * @param {!Blockly.BlockSvg.PathObject} pathObject The object containing
 *     partially constructed SVG paths, which will be modified by this function.
 * @param {!Array.<!Object>} row An object containing position information about
 *     inputs on this row of the block.
 * @param {!Object} cursor An object containing the position of the cursor,
 *     which determines where to start laying out fields.
 * @param {!Object} connectionPos An object containing the position of the
 *     connection on this input.
 * @param {number} rightEdge The position of the right edge of the block, which
 *     is based on the widest row that has been encountered so far.
 * @private
 */
Blockly.BlockSvg.prototype.renderInlineRow_ = function (pathObject, row, cursor, connectionPos, rightEdge) {
  var inlineSteps = pathObject.inlineSteps;
  var highlightInlineSteps = pathObject.highlightInlineSteps;
  var steps = pathObject.steps;
  var highlightSteps = pathObject.highlightSteps;

  for (var x = 0, input; input = row[x]; x++) {

    var fieldX = cursor.x; // Hole 위치
    var fieldY = cursor.y;
    // inline 텍스트 위치 - Text location
    // if then repeat x times위치 - location, turn
    if (row.thicker) {
      // Lower the field slightly.
      //TODO 가운데 드랍다운 위치, else if 텍스트 위치.
      //TODO Unpack the location, otherwise the text location.
      fieldY += Blockly.BlockSvg.INLINE_PADDING_Y;
    }

    // TODO: Align inline field rows (left/right/centre).
    cursor.x = this.renderFields_(input.fieldRow, fieldX, fieldY, input);

    if (input.type != Blockly.DUMMY_INPUT) {
      cursor.x += input.renderWidth + Blockly.BlockSvg.SEP_SPACE_X;
    }
    if (input.type == Blockly.INPUT_VALUE) {

      if (input.controlButton) {

        // nowcoding의 if-else블록에 추가한 control Button에 대한 로직
        // Logic for control button added to if-else block in nowcoding ?
      }

      // 블록의 두께 정의_3 : Hole의 시작점
      //Define block thickness _3: Starting point of the hole
      if (this.NowCodingBlockType === "TextLabelInputHole" || this.NowCodingBlockType === "TextLabelInputHoleLoop" || this.NowCodingBlockType === "TextLabelDropdown") {
        inlineSteps.push('M', (-1 + cursor.x -  (Blockly.BlockSvg.SEP_SPACE_X * 1.5) - Blockly.BlockSvg.CORNER_RADIUS) +
          ',' + (cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y + Blockly.BlockSvg.NOWCODING_HEIGHT_Y / 2 - 6));
      } else if (this.NowCodingBlockType === "IfElseTextLabelNonMutator") {

        if (input.NowCodingBlockType === "IfStatement") {
          inlineSteps.push('M', (-1 + cursor.x - (Blockly.BlockSvg.SEP_SPACE_X * 1.5) - Blockly.BlockSvg.CORNER_RADIUS) +
            ',' + (cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y + Blockly.BlockSvg.NOWCODING_HEIGHT_Y / 2 - 6));
        }

      } else if (this.NowCodingBlockType === "IfTextLabelMutator") {

        if (input.NowCodingBlockType === "IfStatement") {
          inlineSteps.push('M', (-1 + cursor.x - (Blockly.BlockSvg.SEP_SPACE_X * 1.5) - Blockly.BlockSvg.CORNER_RADIUS) +
            ',' + (cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y + Blockly.BlockSvg.NOWCODING_HEIGHT_Y / 2 - 6));
        }

      } else if (this.NowCodingBlockType === "LoopDefault" || this.NowCodingBlockType === "LoopDefault_2") {
        inlineSteps.push('M', (-1 + cursor.x -  (Blockly.BlockSvg.SEP_SPACE_X * 1.5) - Blockly.BlockSvg.CORNER_RADIUS) +
          ',' + (cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y + Blockly.BlockSvg.NOWCODING_HEIGHT_Y / 2 - 6));

      } else if (this.NowCodingBlockType === "LoopDefault_3") {
          inlineSteps.push('M', (-1 + cursor.x -  (Blockly.BlockSvg.SEP_SPACE_X * 1.5) + 4 * Blockly.BlockSvg.CORNER_RADIUS) +
            ',' + (cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y + Blockly.BlockSvg.NOWCODING_HEIGHT_Y / 2 - 6));
      } else if (this.NowCodingBlockType === "LogicDefaultNoMargin" || this.NowCodingBlockType === "MathWithDropdown") {
        inlineSteps.push('M', (-1 + cursor.x -  (Blockly.BlockSvg.SEP_SPACE_X * 1.5) - Blockly.BlockSvg.CORNER_RADIUS) +
          ',' + (cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y - 1));
      } else {
        inlineSteps.push('M', (-1 + cursor.x - (Blockly.BlockSvg.SEP_SPACE_X * 1.5) - Blockly.BlockSvg.CORNER_RADIUS) +
          ',' + (cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y));
      }

      // inlineSteps.push('M', (-1 + cursor.x - Blockly.BlockSvg.SEP_SPACE_X - 1 * Blockly.BlockSvg.CORNER_RADIUS) +
      //   ',' + (cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y));
      inlineSteps.push('h', Blockly.BlockSvg.TAB_WIDTH + 2 -
        input.renderWidth - Blockly.BlockSvg.NOWCODING_INLINE_DUMMY_W + Blockly.BlockSvg.CORNER_RADIUS);

      inlineSteps.push(Blockly.BlockSvg.INNER_DUMMY_TOP_LEFT_CORNER);

      // corner radius를 바꾸면 여기 0의값을 바꿔야하는 이슈 있음 - If you change the corner radius, you need to change the value of 0 here.
      // corner radius =8 이면 0을 4로 - If corner radius = 8, set 0 to 4
      // corner radius =10 이면 0으로 유지한다 - If corner radius = 10, keep 0

      // console.log("renderInlineRow_.input", input);
      inlineSteps.push('v', 16 + input.renderHeight - Blockly.BlockSvg.TAB_HEIGHT);

      // rounded inline connection hole.
      //TODO[29/07/19]: Lee Middlebrook - need to update hole to match block or update block to match hole.
      // inlineSteps.push('v', 6 + input.renderHeight - Blockly.BlockSvg.TAB_HEIGHT + 0 * Blockly.BlockSvg.CORNER_RADIUS);

      inlineSteps.push(Blockly.BlockSvg.INNER_DUMMY_BOTTOM_LEFT_CORNER);

      inlineSteps.push('h', -(Blockly.BlockSvg.TAB_WIDTH + 2 -
        input.renderWidth - Blockly.BlockSvg.NOWCODING_INLINE_DUMMY_W + Blockly.BlockSvg.CORNER_RADIUS));


      inlineSteps.push(Blockly.BlockSvg.INNER_DUMMY_BOTTOM_RIGHT_CORNER);

      // corner radius를 바꾸면 여기 0의값을 바꿔야하는 이슈 있음  - If you change the corner radius, you need to change the value of 0 here.
      // corner radius =8 이면 0을 4로 - If corner radius = 8, set 0 to 4
      // corner radius =10 이면 0으로 유지한다 - If corner radius = 10, keep 0
      inlineSteps.push('v', -(16 + input.renderHeight - Blockly.BlockSvg.TAB_HEIGHT));

      // rounded inline connection hole.
      //TODO[29/07/19]: Lee Middlebrook - need to update hole to match block or update block to match hole.
      // inlineSteps.push('v', -(6 + input.renderHeight - Blockly.BlockSvg.TAB_HEIGHT + 0 * Blockly.BlockSvg.CORNER_RADIUS));
      inlineSteps.push(Blockly.BlockSvg.INNER_DUMMY_TOP_RIGHT_CORNER);

      inlineSteps.push('z');


      if (this.RTL) {
        // Highlight right edge, around back of tab, and bottom.
        highlightInlineSteps.push('M',
          (cursor.x - Blockly.BlockSvg.SEP_SPACE_X - 2.5 +
            Blockly.BlockSvg.TAB_WIDTH - input.renderWidth) + ',' +
          (cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y + 0.5));

        // BLOCKLY ORIGINAL CODE
        // highlightInlineSteps.push(
        //   Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL);
        // highlightInlineSteps.push('v',
        //   input.renderHeight - Blockly.BlockSvg.TAB_HEIGHT + 2.5);

        // NOWCODING CUSTOMIZED
        highlightInlineSteps.push('v',
          input.renderHeight - Blockly.BlockSvg.TAB_HEIGHT + 2.5 + Blockly.BlockSvg.TAB_HEIGHT + 20);

        highlightInlineSteps.push('h',
          input.renderWidth - Blockly.BlockSvg.TAB_WIDTH + 2);
      } else {
        // Highlight right edge, bottom.
        highlightInlineSteps.push('M',
          (cursor.x - Blockly.BlockSvg.SEP_SPACE_X + 0.5 - Blockly.BlockSvg.NOWCODING_INLINE_DUMMY_W) + ',' +
          (cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y + 0.5));
        highlightInlineSteps.push('v', input.renderHeight + 1);
        highlightInlineSteps.push('h', Blockly.BlockSvg.TAB_WIDTH - 2 -
          input.renderWidth);
        // Short highlight glint at bottom of tab.
        highlightInlineSteps.push('M',
          (cursor.x - input.renderWidth - Blockly.BlockSvg.SEP_SPACE_X +
            0.9 + Blockly.BlockSvg.NOWCODING_INLINE_DUMMY_W) + ',' + (cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y +
              Blockly.BlockSvg.TAB_HEIGHT - 0.7));
        highlightInlineSteps.push('l',
          (Blockly.BlockSvg.TAB_WIDTH * 0.46) + ',-2.1');
      }
      // Create inline input connection.
      if (this.RTL) {
        connectionPos.x = -cursor.x -
          Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X + input.renderWidth + 1;
      } else {
          // Hole에 붙는 위치 : X좌표 - Attached to holes: X coordinates
          if (this.NowCodingBlockType === "LoopDefault_3") {
              connectionPos.x = cursor.x +
                Blockly.BlockSvg.TAB_WIDTH - Blockly.BlockSvg.SEP_SPACE_X -
                input.renderWidth - 7 - Blockly.BlockSvg.NOWCODING_INLINE_DUMMY_W;
          } else {
              connectionPos.x = cursor.x +
                Blockly.BlockSvg.TAB_WIDTH - Blockly.BlockSvg.SEP_SPACE_X -
                input.renderWidth - 17 - Blockly.BlockSvg.NOWCODING_INLINE_DUMMY_W;
          }
      }

      // 블록의 두께 정의_4 :  Hole에 붙는 위치 : Y좌표 - Definition of block thickness _4: Position attached to the hole: Y coordinate
      if (this.NowCodingBlockType === "TextLabelInputHole" || this.NowCodingBlockType === "TextLabelInputHoleLoop" ||
        this.NowCodingBlockType === "TextLabelDropdown") {
        connectionPos.y = cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y - 5 + Blockly.BlockSvg.NOWCODING_HEIGHT_Y / 2;
      } else if (this.NowCodingBlockType === "IfElseTextLabelNonMutator") {
        if (input.NowCodingBlockType === "IfStatement") {
          connectionPos.y = cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y + 1 + Blockly.BlockSvg.NOWCODING_HEIGHT_Y / 2;
        }
      } else if (this.NowCodingBlockType === "IfTextLabelMutator") {
        if (input.NowCodingBlockType === "IfStatement") {
          connectionPos.y = cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y - 5 + Blockly.BlockSvg.NOWCODING_HEIGHT_Y / 2;
        }
    } else if (this.NowCodingBlockType === "LoopDefault" || this.NowCodingBlockType === "LoopDefault_2" || this.NowCodingBlockType === "LoopDefault_3") {
        connectionPos.y = cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y - 5 + Blockly.BlockSvg.NOWCODING_HEIGHT_Y / 2;
      } else if (this.NowCodingBlockType === "LogicDefaultNoMargin" || this.NowCodingBlockType === "MathWithDropdown") {
        // connectionPos.y = cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y - 13 + Blockly.BlockSvg.NOWCODING_HEIGHT_Y / 2;
        connectionPos.y = cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y;
      }else {
        connectionPos.y = cursor.y + Blockly.BlockSvg.INLINE_PADDING_Y + 1;
      }

      input.connection.setOffsetInBlock(connectionPos.x, connectionPos.y);
    }

  }

  // console.log(" ~~ " + cursor.x + " " + rightEdge + " " + this.width)
  // if elseif 안에 input field 있으면, 아래에있는 모든 inputrow width를 같이 늘린다.
  //If there is an input field in the elseif, increase all the inputrow widths below.
  if (rightEdge < this.width) {
    rightEdge = this.width;
    cursor.x = Math.max(cursor.x, rightEdge);
  } else {
    cursor.x = Math.max(cursor.x, rightEdge);
  }

  this.width = Math.max(this.width, cursor.x );
  //Hat Length
  steps.push('H', cursor.x - 30 ); // if, elseif, else right Edge
  console.log("cursor.x", cursor.x);
  //next is FOOT;

  // cursor.x = 100;
  highlightSteps.push('H', cursor.x - 0.5);

  // NOWCODING CUSTOMIZED
  // NOWCODING RIGHT TOP CORNER
  if (!this.squareTopLeftCorner_) {
    // Top-right rounded corner.
    steps.push(Blockly.BlockSvg.TOP_RIGHT_CORNER);
    // highlightSteps.push(Blockly.BlockSvg.TOP_RIGHT_CORNER_HIGHLIGHT);
  }

  steps.push('v', row.height - Blockly.BlockSvg.CORNER_RADIUS * 2);

  if (this.RTL) {
    highlightSteps.push('v', row.height - 1 - Blockly.BlockSvg.CORNER_RADIUS * 2);
  }

  // NOWCODING RIGHT BOTTOM CORNER
  if (!this.squareTopLeftCorner_) {
    // Top-right rounded corner.
    steps.push(Blockly.BlockSvg.BOTTOM_RIGHT_CORNER);
    // highlightSteps.push(Blockly.BlockSvg.BOTTOM_RIGHT_CORNER_HIGHLIGHT);
  }

};



// Used to be resizeInputCoordinate()
//TODO[31/07/19]: Lee Middlebrook - Delete me?? or move renderFields_ stuff here??
Blockly.BlockSvg.prototype.updateInputFieldCoordinate = function (inputRows, cursor) {
  var inputList, input, field, fieldRowList, fieldGroup_;
  var x, y, i, j, h;

  var outerHtmlMaxWidth;
  // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~", cursor)

  for (i = 0; inputList = inputRows[i]; i++) {
    for (j = 0; input = inputList[j]; j++) {
      // console.log(input.name);
      if (input.name == "ELSE" || input.name == "ELSE_" || input.name == "else" || input.name == "RETURN") {

        if (input.controlButton && input.controlButton.op != "REMOVE_ELSE") {
          /*
                // console.log("~~~~~~~~~~~~   ~~~~~~", input.controlButton)
                // console.log("~~~~~~~~~~~~   ~~~~~~", input.controlButton.controlIconSvgGroup_)
                var svgGroup_ = input.controlButton.controlIconSvgGroup_;
                if (svgGroup_) {


                  var outerHtml = svgGroup_.outerHTML;

                  var tempWidth = outerHtml.substring(
                    outerHtml.indexOf('transform="translate(') + 21,
                    outerHtml.indexOf(', ')
                  );

                  var tempHeight = outerHtml.substring(
                    outerHtml.indexOf(', ') + 2,
                    outerHtml.indexOf(')">')
                  );

                  if (!outerHtmlMaxWidth) {
                    outerHtmlMaxWidth = tempWidth;
                  } else {
                    // console.log("$$$$$$$$$$$$$$$$$$$$$", outerHtmlMaxWidth + " " + tempWidth);
                    if (outerHtmlMaxWidth < tempWidth) {
                      outerHtmlMaxWidth = tempWidth;
                    }
                    Blockly.ControlIcon.translate(input, cursor.x, tempHeight, input.controlButton.block_.width);
                  }


                  //안쪽 rect, text 수정
                  var newHeight = inputList.height - 1;

                  var newIconY = Math.floor(newHeight / 2) - 1;
                  var newIconY2 = newIconY - 6;
                  // svgGroup_ = null;
                  var prevHeight = svgGroup_.innerHTML.substring(
                    svgGroup_.innerHTML.indexOf('" height="') + 10,
                    svgGroup_.innerHTML.indexOf('" rx="')
                  );

                  var prevIconYY = svgGroup_.innerHTML.substring(
                    svgGroup_.innerHTML.indexOf('x="4" y="') + 9,
                    svgGroup_.innerHTML.indexOf('x="4" y="') + 11
                  );

                  // console.log("newHeight : " + newHeight);
                  // console.log("prevHeight : " + prevHeight);
                  // var preIconY = Math.floor(prevHeight / 2) - 7;
                  var preIconY2 = prevIconYY - 6;
                  // console.log(newIconY + " " + prevIconYY);
                  // console.log(inputList);
                  // parent.removeChild(target)
                  // console.log();

                  svgGroup_.innerHTML = svgGroup_.innerHTML.split('height="' + prevHeight + '"').join('height="' + (newHeight) + '"')
                  svgGroup_.innerHTML = svgGroup_.innerHTML.split('y="' + prevIconYY + '"').join('y="' + newIconY + '"')
                  svgGroup_.innerHTML = svgGroup_.innerHTML.split('y="' + preIconY2 + '"').join('y="' + newIconY2 + '"')
                  // svgGroup_.innerHTML = svgGroup_.innerHTML.replace(prevHeight, newHeight - 2);
                  // console.log(svgGroup_.innerHTML);
                }
          */
          continue
        } else if (input.controlButton && input.controlButton.op === "REMOVE_ELSE") {
          /*
               // console.log("~~~~~~~~~~~~   ~~~~~~1", input.controlButton.controlIconSvgGroup_)
               // console.log("~~~~~~~~~~~~   ~~~~~~2", outerHtmlMaxWidth)
               var svgGroup_ = input.controlButton.controlIconSvgGroup_;
               if (svgGroup_) {
                 // console.log("~~~~~~~~~~~~   ~~~~~~3", svgGroup_)
                 var outerHtml = svgGroup_.outerHTML;

                 var tempWidth = outerHtml.substring(
                   outerHtml.indexOf('transform="translate(') + 21,
                   outerHtml.indexOf(', ')
                 );

                 var tempHeight = outerHtml.substring(
                   outerHtml.indexOf(', ') + 2,
                   outerHtml.indexOf(')">')
                 );

                 if (outerHtmlMaxWidth) {
                   // console.log("~~~~~~~~~~~~   ~~~~~~4", tempWidth + " " + tempHeight + " " + outerHtmlMaxWidth)
                   Blockly.ControlIcon.translate(input, outerHtmlMaxWidth, tempHeight, input.controlButton.block_.width);
                 }
               }
          */
          continue
        } else {
          continue;
        }
        continue
      }


      // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~", inputRows)
      // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~", cursor)
      // console.log(Blockly.BlockSvg.PrevRowCursorOfElse);
      // console.log("~~~~~~~~~~~~~~~~", this);
      // console.log(input.name);

      fieldRowList = input.fieldRow;
      for (h = 0; field = fieldRowList[h]; h++) {
        //TODO[17/07/19]: Lee Middlebrook - Test and Delete!
        // if (field.fieldGroup_) {
        //   fieldGroup_ = field.fieldGroup_;
        // }
        // else if (field.textElement_) {
        //   fieldGroup_ = field.textElement_;
        // }


        if(field.getSvgRoot())
          fieldGroup_ = field.getSvgRoot();

        if (fieldGroup_ && fieldGroup_.getAttribute('transform')) {
          var isIE = /*@cc_on!@*/false || !!document.documentMode;
          var isEdge = !isIE && !!window.StyleMedia;
          if (isIE || isEdge) {
            x = fieldGroup_.getAttribute('transform').split("(")[1].split(" ")[0];
            y = fieldGroup_.getAttribute('transform').split("(")[1].split(" ")[1].split(")")[0];
          }
          else {
            x = fieldGroup_.getAttribute('transform').split("(")[1].split(",")[0];
            y = fieldGroup_.getAttribute('transform').split("(")[1].split(",")[1].split(")")[0];
          }
          // console.log("#$$########", input.sourceBlock_.NowCodingBlockType);
          // console.log(input);
          var offsetY = 0;
          if (input.sourceBlock_.NowCodingBlockType === "LoopDefault_2") {
            offsetY = 0;
          } else if (input.sourceBlock_.NowCodingBlockType === "LogicDefaultNoMargin") {
            offsetY = 0;
          } else if (input.sourceBlock_.NowCodingBlockType === "LogicNegate") {
            offsetY = 0;
          } else if (input.sourceBlock_.NowCodingBlockType === "MathWithDropdown") {
            offsetY = 0;
          } else if (input.sourceBlock_.NowCodingBlockType === "TextWithDropdown") {
            offsetY = 0;
          } else if (input.sourceBlock_.NowCodingBlockType === "TextLabelInputHole") {
            offsetY = 0;
          } else if (input.sourceBlock_.NowCodingBlockType === "TextLabelInputHoleLoop") {
            offsetY = 0;
          } else if (input.sourceBlock_.NowCodingBlockType === "IfElseTextLabelNonMutator") {
            offsetY = 0;
          }


          if (input.name.indexOf("DO") != -1) {
            // console.log("~~~~~~~")
            // console.log(x + " " + y)
            // console.log("~~~~~~~")
            // console.log(inputList.height + " " + input.renderHeight)
            // console.log("~~~~~~~")

            // continue;
            // fieldGroup_.setAttribute('transform',
            //   'translate(' + x + ',' + (Number(y) + ) + ')');


          } else if (input.name.indexOf("IF") != -1) {
            // console.log("~~~~~~~")
            // console.log(cursor.y + " " + y)
            // console.log(inputList.height + " " + input.renderHeight + " " + fieldGroup_.getBBox().height)
            // console.log("~~~~~~~")
            y = ((offsetY + inputList.height - input.renderHeight) / 2 + (input.renderHeight - fieldGroup_.getBBox().height) / 2);
            // console.log("IF: fieldGroup_.setAttribute:", fieldGroup_, input, "x:", x, "y:", y);
            // console.log("offsetY:", offsetY, "in.height", inputList.height, "in.ren.height", input.renderHeight, "getbox.height", fieldGroup_.getBBox().height);
            // console.log("field", field);

            // console.log(fieldGroup_);
            continue;

          } else {
            //FIXME[16/07/19]: Lee Middlebrook - hidden in the deepest cave...
            //set fieldgroup transform??
            y = ((offsetY + inputList.height - input.renderHeight) / 2 + (input.renderHeight - fieldGroup_.getBBox().height) / 2);

            field.getSvgRoot().setAttribute('transform','translate(' + x + ',' + y + ')');
            // console.log("ELSE: fieldGroup_.setAttribute:", fieldGroup_, input, "x:", x, "y:", y);
            // console.log("offsetY:", offsetY, "in.height", inputList.height, "in.ren.height", input.renderHeight, "getbox.height", fieldGroup_.getBBox().height);

            /*fieldGroup_.setAttribute('transform',
              'translate(' + x + ',' + ((offsetY + inputList.height - input.renderHeight) / 2 + (input.renderHeight - fieldGroup_.getBBox().height) / 2) + ')');*/

          }

          // inputList.height => 전체 높이
          // - inputList.height => full height
          // input.renderHeight => 자기 높이 시빌링의 높이 중 가장 작은 걸 기준으로 해야할듯
          // - input.renderHeight => the height of the sibilings should be based on the smallest of the heights

        }
      }
    }
  }
};









//Used to be resizeInputCoordinate2()
Blockly.BlockSvg.prototype.updateControlIconInputCoordinate = function (row, cursor) {
  var controlButtonPosY = 0;
  //for all inputs in the row
  for (var j = 0, input; input = row[j]; j++) {
    if(this.isControlBlock) {
      //update the position of block ControlIcon (for if statements)
      if (this.controlButton && this.controlButton.controlIconSvgGroup_) {
        var controlAddButtonPosX = -52;
        const ADD_BUTTON_BASE_Y = -15;

        if (this.controlButton.op === BUTTON_OPERATION_TYPE.ADD) { //needed?
          controlButtonPosY = row.height + cursor.y + ADD_BUTTON_BASE_Y;
          Blockly.ControlIcon.translate(this, controlAddButtonPosX, controlButtonPosY, this.controlButton.block_.width);
        }
      }
      //update input controlButtons;
      if (input.controlButton && input.controlButton.controlIconSvgGroup_) {
        var controlRemoveButtonPosX = -13;
        //set base Y position if input has a block or not;
        var REMOVE_BUTTON_BASE_Y = input.connection.isConnected() ? -30 : -25;

        controlButtonPosY = row.height + cursor.y + REMOVE_BUTTON_BASE_Y;

        //update the ControlIcon for ELSE_IF else update ELSE
        if (input.controlButton.op === BUTTON_OPERATION_TYPE.REMOVE_ELSE_IF) {
          Blockly.ControlIcon.translate(input, controlRemoveButtonPosX, controlButtonPosY, input.controlButton.block_.width);
        } else if (input.controlButton.op === BUTTON_OPERATION_TYPE.REMOVE_ELSE) {
          var ELSE_OFFSET = 40;
          Blockly.ControlIcon.translate(input, controlRemoveButtonPosX, cursor.y - ELSE_OFFSET, input.controlButton.block_.width);
        }
      }
    }
  }
};



/**
 * Render the right side of an inline row on a block.
 * @param {!Blockly.BlockSvg.PathObject} pathObject The object containing
 *     partially constructed SVG paths, which will be modified by this function.
 * @param {!Array.<!Object>} row An object containing position information about
 *     inputs on this row of the block.
 * @param {!Object} cursor An object containing the position of the cursor,
 *     which determines where to start laying out fields.
 * @param {!Object} connectionPos An object containing the position of the
 *     connection on this input.
 * @param {number} rightEdge The position of the right edge of the block, which
 *     is based on the widest row that has been encountered so far.
 * @private
 */
Blockly.BlockSvg.prototype.renderExternalValueInput_ = function (pathObject, row, cursor, connectionPos, rightEdge) {
  var steps = pathObject.steps;
  var highlightSteps = pathObject.highlightSteps;
  // External input.
  var input = row[0];
  var fieldX = cursor.x;
  var fieldY = cursor.y;
  if (input.align != Blockly.ALIGN_LEFT) {
    //category - colour, Function // TODO LATER
    var fieldRightX = rightEdge - input.fieldWidth -
      Blockly.BlockSvg.TAB_WIDTH - 2 * Blockly.BlockSvg.SEP_SPACE_X;
    if (input.align == Blockly.ALIGN_RIGHT) {
      fieldX += fieldRightX;
    } else if (input.align == Blockly.ALIGN_CENTRE) {
      fieldX += fieldRightX / 2;
    }
  }

  this.renderFields_(input.fieldRow, fieldX, fieldY);



  if (input.align != Blockly.ALIGN_LEFT) {
    //category - colour, Function // TODO LATER
    var v = row.height - Blockly.BlockSvg.TAB_HEIGHT + Blockly.BlockSvg.TAB_HEIGHT;
    steps.push('v', v);
  } else {
    // BLOCKLY ORIGINAL CODE
    // steps.push(Blockly.BlockSvg.TAB_PATH_DOWN);
    // var v = row.height - Blockly.BlockSvg.TAB_HEIGHT;

    // NOWCODING CUSTOMIZED
    // NOWCODING RIGHT TOP CORNER
    if (!this.squareTopLeftCorner_) {
      // Top-right rounded corner.
      steps.push(Blockly.BlockSvg.TOP_RIGHT_CORNER);
      // highlightSteps.push(Blockly.BlockSvg.TOP_RIGHT_CORNER_HIGHLIGHT);
    }
    var v = row.height - Blockly.BlockSvg.TAB_HEIGHT + Blockly.BlockSvg.TAB_HEIGHT - Blockly.BlockSvg.CORNER_RADIUS * 2;
    steps.push('v', v);

    // NOWCODING RIGHT BOTTOM CORNER
    if (!this.squareTopLeftCorner_) {
      // Top-right rounded corner.
      steps.push(Blockly.BlockSvg.BOTTOM_RIGHT_CORNER);
      // highlightSteps.push(Blockly.BlockSvg.BOTTOM_RIGHT_CORNER_HIGHLIGHT);
    }

  }


  if (this.RTL) {
    // Highlight around back of tab.

    // BLOCKLY ORIGINAL CODE
    // highlightSteps.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL);
    // highlightSteps.push('v', v + 0.5);

    // NOWCODING CUSTOMIZED
    highlightSteps.push('v', v + 0.5 + Blockly.BlockSvg.TAB_HEIGHT);


  } else {
    // Short highlight glint at bottom of tab.
    highlightSteps.push('M', (rightEdge - 10) + ',' +
      (cursor.y + Blockly.BlockSvg.TAB_HEIGHT - 0.7));
    highlightSteps.push('l', (Blockly.BlockSvg.TAB_WIDTH * 0.46) +
      ',-2.1');
  }
  // Create external input connection.
  connectionPos.x = this.RTL ? -rightEdge - 1 : rightEdge + 1;
  input.connection.setOffsetInBlock(connectionPos.x, cursor.y);
  if (input.connection.isConnected()) {
    this.width = Math.max(this.width, rightEdge +
      input.connection.targetBlock().getHeightWidth().width -
      Blockly.BlockSvg.TAB_WIDTH + 1);
  }
};

/**
 * Render the right side of an inline row on a block.
 * 블록 안쪽에 들어가는 영역
 * @param {!Blockly.BlockSvg.PathObject} pathObject The object containing
 *     partially constructed SVG paths, which will be modified by this function.
 * @param {!Array.<!Object>} row An object containing position information about
 *     inputs on this row of the block.
 * @param {!Object} cursor An object containing the position of the cursor,
 *     which determines where to start laying out fields.
 * @param {number} rightEdge The position of the right edge of the block, which
 *     is based on the widest row that has been encountered so far.
 * @param {boolean} hasValue True if this block has at least one value input.
 * @private
 */
Blockly.BlockSvg.prototype.renderDummyInput_ = function (pathObject, row,
  cursor, rightEdge, hasValue) {
  var steps = pathObject.steps;
  var highlightSteps = pathObject.highlightSteps;
  var input = row[0];
  var fieldX = cursor.x;
  var fieldY = cursor.y;
  if (input.align != Blockly.ALIGN_LEFT) {
    var fieldRightX = rightEdge - input.fieldWidth - Blockly.BlockSvg.SEP_SPACE_X;
    if (hasValue) {
      fieldRightX -= Blockly.BlockSvg.TAB_WIDTH;
    }
    if (input.align == Blockly.ALIGN_RIGHT) {
      fieldX += fieldRightX;
    } else if (input.align == Blockly.ALIGN_CENTRE) {
      fieldX += fieldRightX / 2;
    }
  }

  /// NOWCODING
  if (row.type == Blockly.DUMMY_INPUT) {
    // console.log("dummy input")
    this.renderFields_(input.fieldRow, fieldX + Blockly.BlockSvg.CORNER_RADIUS / 2, fieldY);
  }


  // NOWCODING RIGHT TOP CORNER
  if (!this.squareTopLeftCorner_) {
    // Top-right rounded corner.

    if (this.NowCodingBlockType === "Dropdown" || this.NowCodingBlockType === "LogicNegate" || this.NowCodingBlockType === "MathDefault") {
      steps.push(
        'a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
        Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 ' +
        Blockly.BlockSvg.CORNER_RADIUS + ',' + Blockly.BlockSvg.CORNER_RADIUS
      );
      highlightSteps.push(Blockly.BlockSvg.TOP_RIGHT_CORNER_HIGHLIGHT);
    } else {
      steps.push(Blockly.BlockSvg.TOP_RIGHT_CORNER);
      highlightSteps.push(Blockly.BlockSvg.TOP_RIGHT_CORNER_HIGHLIGHT);
    }

  }

  steps.push('v', row.height - Blockly.BlockSvg.CORNER_RADIUS * 2);
  if (this.RTL) {
    highlightSteps.push('v', row.height - 1);
  }

  // NOWCODING RIGHT BOTTOM CORNER
  if (!this.squareTopLeftCorner_) {
    // Top-right rounded corner.

    if (this.NowCodingBlockType === "Dropdown" || this.NowCodingBlockType === "LogicNegate" || this.NowCodingBlockType === "MathDefault") {
      steps.push(
        'a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
        Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 -' +
        Blockly.BlockSvg.CORNER_RADIUS + ',' + Blockly.BlockSvg.CORNER_RADIUS
      );
      highlightSteps.push(Blockly.BlockSvg.TOP_RIGHT_CORNER_HIGHLIGHT);
    } else {

      steps.push(Blockly.BlockSvg.BOTTOM_RIGHT_CORNER);
      highlightSteps.push(Blockly.BlockSvg.BOTTOM_RIGHT_CORNER_HIGHLIGHT);
    }
  }

};


/**
 * Render the right side of an inline row on a block.
 * if-else-do 에서 do의 위치?
 * @param {!Blockly.BlockSvg.PathObject} pathObject The object containing
 *     partially constructed SVG paths, which will be modified by this function.
 * @param {!Array.<!Object>} row An object containing position information about
 *     inputs on this row of the block.
 * @param {!Object} cursor An object containing the position of the cursor,
 *     which determines where to start laying out fields.
 * @param {!Object} connectionPos An object containing the position of the
 *     connection on this input.
 * @param {!Array.<!Array.<!Object>>} inputRows 2D array of objects, each
 *     containing position information.
 * @param {number} index The index of the current row in the inputRows array.
 * @private
 */
Blockly.BlockSvg.prototype.renderStatementInput_ = function (pathObject,
                                                             row,
                                                             cursor,
                                                             connectionPos,
                                                             inputRows,
                                                             index) {
  var steps = pathObject.steps;
  var highlightSteps = pathObject.highlightSteps;
  var input = row[0];

  if (index == 0) {
    // If the first input is a statement stack, add a small row on top.
    steps.push('v', Blockly.BlockSvg.SEP_SPACE_Y);
    if (this.RTL) {
      highlightSteps.push('v', Blockly.BlockSvg.SEP_SPACE_Y - 1);
    }
    cursor.y += Blockly.BlockSvg.SEP_SPACE_Y;
    // cursor.y--;
  }
  var fieldX = cursor.x;
  var fieldY = cursor.y;
  if (input.align != Blockly.ALIGN_LEFT) {
    var fieldRightX = inputRows.statementEdge - input.fieldWidth -
     Blockly.BlockSvg.SEP_SPACE_X / 2;
    if (input.align == Blockly.ALIGN_RIGHT) {
      fieldX += fieldRightX;
    } else if (input.align == Blockly.ALIGN_CENTRE) {
      fieldX += fieldRightX / 2;
    }
  }
  this.renderFields_(input.fieldRow, fieldX, fieldY, input);
  // if-else / repeat 블록간의 하단 좌우 연결 여백 +1 - Inside block inside bottom join margin +1
  cursor.x = inputRows.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH;
  steps.push('H', cursor.x );
  steps.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER);

  //remove else할때 이슈 해결 - Resolve issues when - removing else
  if (row.height === 45.5) {
    row.height += 20;
  }

  //ifelse 블록 Do 영역 높이정의_1 - Block Do Define Area Height_1
  steps.push('v', row.height - Blockly.BlockSvg.CORNER_RADIUS * 2);
  // steps.push('v', row.height - 2 * Blockly.BlockSvg.CORNER_RADIUS);
  steps.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER);

  // steps.push('H', inputRows.rightEdge);
  // ㄷ블록 - bottom edge.
  // steps.push('H', inputRows.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH);
  steps.push('H', inputRows.statementEdge + 30);
  steps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT);
  var connectionX = (this.RTL ?
    -Blockly.BlockSvg.NOTCH_WIDTH : Blockly.BlockSvg.NOTCH_WIDTH);
  // this.previousConnection.setOffsetInBlock(connectionX, 0);

  //if록 Do 영역 높이정의_3 - Do Define Area Height _3
  if (row[0].name.indexOf("DO") >= 0 || row[0].name.indexOf("ELSE") >= 0) {
    var STATEMENT_FOOT_LENGTH = 100;
    if (this.NowCodingBlockType === "LoopDefault" || this.NowCodingBlockType === "LoopDefault_2"
      || this.NowCodingBlockType === "LoopDefault_3" || this.NowCodingBlockType === "RepeatUntilHome") {

      if (Blockly.BlockSvg.PrevRowCursorOfElse && Blockly.BlockSvg.PrevRowCursorOfElse[this.id]) {
        steps.push('H', STATEMENT_FOOT_LENGTH);//Blockly.BlockSvg.PrevRowCursorOfElse[this.id].x - 30);
      } else {
        steps.push('H', STATEMENT_FOOT_LENGTH);//inputRows.rightEdge);
      }
    } else if (this.NowCodingBlockType === "IfTextLabelMutator" || this.NowCodingBlockType === "IfElseTextLabelNonMutator") {
      if (Blockly.BlockSvg.PrevRowCursorOfElse && Blockly.BlockSvg.PrevRowCursorOfElse[this.id]) {
        //for custom else foot lengths.
        //Else foot length offset
        //TODO[15/07/19]: Lee Middlebrook - move this stuff
        //Fix foot length
        steps.push('H', STATEMENT_FOOT_LENGTH); //Blockly.BlockSvg.PrevRowCursorOfElse[this.id].x - 30);
      } else {
        steps.push('H', inputRows.rightEdge);
      }
    }

  } else {
    steps.push('H', inputRows.rightEdge - 30);
  }

  if (this.RTL) {
    highlightSteps.push('M',
      (cursor.x - Blockly.BlockSvg.NOTCH_WIDTH +
        Blockly.BlockSvg.DISTANCE_45_OUTSIDE) +
      ',' + (cursor.y + Blockly.BlockSvg.DISTANCE_45_OUTSIDE));
    highlightSteps.push(
      Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL);
    highlightSteps.push('v',
      row.height - 2 * Blockly.BlockSvg.CORNER_RADIUS);
    highlightSteps.push(
      Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL);
    highlightSteps.push('H', inputRows.rightEdge - 0.5);
  } else {
    highlightSteps.push('M',
      (cursor.x - Blockly.BlockSvg.NOTCH_WIDTH +
        Blockly.BlockSvg.DISTANCE_45_OUTSIDE) + ',' +
      (cursor.y + row.height - Blockly.BlockSvg.DISTANCE_45_OUTSIDE));
    highlightSteps.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR);
    // highlightSteps.push('H', inputRows.rightEdge - 0.5);
    highlightSteps.push('H', inputRows.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH - 0.5);
    highlightSteps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT);
    highlightSteps.push('H', inputRows.rightEdge - 0.5);
  }



  // Create statement connection.
  //[16/07/19]: Lee Middlebrook - cursor.x offset by +-10
  connectionPos.x = this.RTL ? -cursor.x + 10 : cursor.x - 10;

  // ㄷ블록 안쪽 : 위 쪽의 커넥션 위치 - Inside of the block: Upper connection position
  //[16/07/19]: Lee Middlebrook - connectionPos.x offset by 16
  input.connection.setOffsetInBlock(connectionPos.x + 16, cursor.y + 1);

  if (input.connection.isConnected()) {
    this.width = Math.max(this.width, inputRows.statementEdge +
      input.connection.targetBlock().getHeightWidth().width);
    // 다음 블록과 연결되면 - Once you are connected to the next block
    // this.height -= 0.5;
  }
  if (index == inputRows.length - 1 ||
    inputRows[index + 1].type == Blockly.NEXT_STATEMENT) {
    // If the final input is a statement stack, add a small row underneath.
    // Consecutive statement stacks are also separated by a small divider.

    // NOWCODING RIGHT TOP CORNER
    if (!this.squareTopLeftCorner_) {
      // Top-right rounded corner.
      // console.log(inputRows)
      steps.push(Blockly.BlockSvg.TOP_RIGHT_CORNER);
      // highlightSteps.push(Blockly.BlockSvg.TOP_RIGHT_CORNER_HIGHLIGHT);
    }

    // console.log("&&&&&&&&", this);
    // else block add row height;
    var height_ = 0;
    if (this.NowCodingBlockType === "IfTextLabelMutator") {
      if (input.NowCodingBlockType == "DoStatement" && input.name !== "DO0") {
        // height_ = 35;
      } else if (input.NowCodingBlockType == "DoStatement") {
        // height_ = 35;
      } else if (input.NowCodingBlockType === "ElseStatement" || input.name === "ELSE") {
        // console.log("###########1111111", input.fieldRow)
        // height_ = 35;
      }
    } else if (this.NowCodingBlockType === "IfElseTextLabelNonMutator") {
      if (input.NowCodingBlockType == "DoStatement" && input.name !== "DO0") {
        height_ = 35;
      } else if (input.NowCodingBlockType == "DoStatement" && inputRows.length > 2) {
        height_ = 35;
      } else if (input.NowCodingBlockType === "ElseStatement") {
        // height_ = 35;
      }
    }

    // if-else / repeat 블록간의 맨 하단 여백 삭제 해주느 파트 + 2
    //// if-else / repeat remove the bottom margin between blocks + 2
    steps.push('v', Blockly.BlockSvg.SEP_SPACE_Y - Blockly.BlockSvg.CORNER_RADIUS * 2 + height_);
    // NOWCODING RIGHT BOTTOM CORNER
    if (!this.squareTopLeftCorner_) {
      // Top-right rounded corner.
      steps.push(Blockly.BlockSvg.BOTTOM_RIGHT_CORNER);
      // highlightSteps.push(Blockly.BlockSvg.BOTTOM_RIGHT_CORNER_HIGHLIGHT);
    }

    if (this.RTL) {
      highlightSteps.push('v', Blockly.BlockSvg.SEP_SPACE_Y - 1);
    }
    cursor.y += Blockly.BlockSvg.SEP_SPACE_Y + height_;
  }





  // console.log("~~~~~~~~~~~~~~~~~~~~~123123   ", input)
  //else - 버튼 : else - button.
  //FIXME[11/07/19]: Lee Middlebrook - Is this even used??
  if (input.controlButton) {

    var cursorX_;
    if (input.name === "ELSE") {
      // console.log(input.controlButton.block_.width)
      if (input.fieldRow && input.fieldRow[0] && input.fieldRow[0].sourceBlock_) {
        cursorX_ = input.fieldRow[0].sourceBlock_.width - 16;
      } else {
        cursorX_ = cursor.x + 63;
      }

      cursor.x += Blockly.ControlIcon.translate(input, cursorX_, fieldY - 52, input.controlButton.block_.width);

    }
    // nowcoding의 if-else블록에 추가한 control Button에 대한 로직
  }
};
