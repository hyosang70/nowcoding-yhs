/**
 * Created by Lee Middlebrook on 19/07/19.
 */
'use strict';

goog.provide("Blockly.ControlIcon");

// goog.require("Blockly");

//TODO[19/07/19]: Lee Middlebrook - exdend this with input or field
// and incorporate with blockly core code and input -> field design

/**
 * @param ButtonOperation   add / remove operator
 * @param {Blockly.Block}  sourceBlock_
 * @param name statement type, ex IF1, DO1, etc...
 * @param {!Blockly.Input} parent in order to disconnect when the input is being disposed
 * @param {!{height: number, width: number}} hw with height and width
 * @constructor
 */


Blockly.ControlIcon = function (ButtonOperation, sourceBlock_, name, parent, hw) {
  this.statementName = name;
  this.parentInput = parent;
  this.block_ = sourceBlock_;
  this.op = ButtonOperation;

  if (this.controlIconSvgGroup_) {
    return;
  }

  if (this.block_.isInsertionMarker()) {
    return;
  }

  this.setSvgGroup();

  if(this.op !== BUTTON_OPERATION_TYPE.ADD)
    this.block_.getSvgRoot().appendChild(this.controlIconSvgGroup_);
};

Blockly.ControlIcon.prototype.render_ = function () {
  if(this.controlIconSvgGroup_)
    this.block_.getSvgRoot().appendChild(this.controlIconSvgGroup_);
};

Blockly.ControlIcon.prototype.redraw = function () {
  var cx = this.x;
  var cy = this.y;

  this.setSvgGroup();
  this.translate(cx, cy);
  this.render_();
};

Blockly.ControlIcon.prototype.translate = function (fieldX, filedY) {
  var computedFieldX = fieldX, computedFieldY = filedY;

  this.x = computedFieldX;
  this.y = computedFieldY;

  if (this.controlIconSvgGroup_) {
    this.controlIconSvgGroup_.setAttribute('transform', 'translate(' + computedFieldX + ', ' + computedFieldY + ')');
  }
};

Blockly.ControlIcon.translate = function (input, cursorX, fieldY, width_) {
  input.controlButton.translate(cursorX, fieldY);
  return 26; //FIXME - Lee Middlebrook: WTF?
};

//moved controlIconSvg assigning here
Blockly.ControlIcon.prototype.setSvgGroup = function() {
  if(this.controlIconSvgGroup_) {
    Blockly.utils.removeNode(this.controlIconSvgGroup_);
  }
  
  this.controlIconSvgGroup_ = Blockly.utils.createSvgElement(
    'g',
    {
      'id': 'control-' + this.op.toLowerCase(),
      'class': 'nowcoding_cursor',
      'data-op':  this.op.toLowerCase()
    },
    null);

  if (this.op === BUTTON_OPERATION_TYPE.ADD) {
    this.drawAddIcon_(this.controlIconSvgGroup_);
    if (this.block_.isInFlyout == false) {
      Blockly.bindEvent_(this.controlIconSvgGroup_, 'mouseup', this, this.addClick_);
    }
  } else if (this.op === BUTTON_OPERATION_TYPE.REMOVE_ELSE) {
    this.drawRemoveIcon_(this.controlIconSvgGroup_);
    if (this.block_.isInFlyout == false) {
      Blockly.bindEvent_(this.controlIconSvgGroup_, 'mouseup', this, this.removeElseClick_);
    }
  } else if (this.op === BUTTON_OPERATION_TYPE.REMOVE_ELSE_IF) {
    this.drawRemoveIcon_(this.controlIconSvgGroup_);
    if (this.block_.isInFlyout == false) {
      Blockly.bindEvent_(this.controlIconSvgGroup_, 'mouseup', this, this.removeClick_);
    }
  }
};


Blockly.ControlIcon.prototype.dispose = function () {
  // Dispose of and unlink the icon.
  goog.dom.removeNode(this.controlIconSvgGroup_);
  this.controlIconSvgGroup_ = null;
  if (this.parentInput) {
    this.parentInput.controlBtn = null;
  }
  this.block_ = null;
  this.op = null;
  this.statementName = null;
  this.parentInput = null;
};


// operator add click evnet bind
Blockly.ControlIcon.prototype.addClick_ = function (e) {
  this.block_.addElseIf();
};
// operator remove click evnet bind
Blockly.ControlIcon.prototype.removeClick_ = function (e) {
  // console.log(this.statementName);
  var index = this.statementName.split("IF")[1];
  // console.log("클릭 인덱스 :", index);
  this.block_.removeElseIf(Number(index));
};
Blockly.ControlIcon.prototype.removeElseClick_ = function (e) {
  this.block_.removeElse();
};

/*
 if-else icon 코드 파일 위치 add button
 if-else icon Code file location add button
 */
//TODO[15/07/19]: Lee Middlebrook - externise and use realtive positioning of elements.
//FIXME[15/07/19]: Lee Middlebrook - single svg 
Blockly.ControlIcon.prototype.drawAddIcon_ = function (svgGroup_) {
  Blockly.utils.createSvgElement('rect',
    {
      'x': 39,
      'y': -1,
      'width': 25,
      'height': 25,
      'rx': 13,
      'style': 'fill:#ffffff;stroke:#3369b1;stroke-width:2px;'
    },
    svgGroup_);

  Blockly.utils.createSvgElement('rect',
    {
      'x': 45,
      'y': 10,
      'width': 13,
      'height': 3,
      'rx': 1,
      'style': 'fill:#437fcf;'
    },
    svgGroup_);

  Blockly.utils.createSvgElement('rect',
    {
      'x': 50,
      'y': 5,
      'width': 3,
      'height': 13,
      'rx': 1,
      'style': 'fill:#437fcf;'
    },
    svgGroup_);
  // 백그라운드
  // Blockly.utils.createSvgElement('path',
  //   {
  //     'd': 'M24,12 C24,18.627 18.627,24 12,24 C5.373,24 0,18.627 0,12 C0,5.373 5.373,0 12,0 C18.627,0 24,5.373 24,12',
  //     'style': 'fill:rgba(51,51,51,0.4)',
  //     /*'class' : 'addIcon'*/
  //   },
  //   svgGroup_);
  // + 아이콘
  // Blockly.utils.createSvgElement('path',
  //   {
  //    'd': 'M13,11 L13,6.00684547 C13,5.44994876 12.5522847,5 12,5 C11.4438648,5 11,5.45078007 11,6.00684547 ' +
  // 'L11,11 L6.00684547,11 C5.44994876,11 5,11.4477153 5,12 C5,12.5561352 5.45078007,13 6.00684547,13 ' +
  // 'L11,13 L11,17.9931545 C11,18.5500512 11.4477153,19 12,19 C12.5561352,19 13,18.5492199 13,17.9931545 ' +
  // 'L13,13 L17.9931545,13 C18.5500512,13 19,12.5522847 19,12 C19,11.4438648 18.5492199,11 17.9931545,11 L13,11 Z',
  //     'style': 'fill:#FFFFFF;'
  //   },
  //   svgGroup_);
};

//???
/*Blockly.ControlIcon.drawAddIcon_ = function (svgGroup_, op, height) {
  // var x, y;
  // if (svgGroup_ && svgGroup_.getAttribute('transform')) {
  //   var isIE = /!*@cc_on!@*!/false || !!document.documentMode;
  //   var isEdge = !isIE && !!window.StyleMedia;
  //   if (isIE || isEdge) {
  //     x = svgGroup_.getAttribute('transform').split("(")[1].split(" ")[0];
  //     y = svgGroup_.getAttribute('transform').split("(")[1].split(" ")[1].split(")")[0];
  //   }
  //   else {
  //     x = svgGroup_.getAttribute('transform').split("(")[1].split(",")[0];
  //     y = svgGroup_.getAttribute('transform').split("(")[1].split(",")[1].split(")")[0];
  //   }
  // }
  // console.log(x + " " + y);
  // console.log(svgGroup_);
  // // svgGroup_.selectAll("*").remove();
  // console.log(svgGroup_);
  // console.log(height);

  var newHeight = height - 1;

  var newIconY = Math.floor(newHeight / 2) - 1;
  var newIconY2 = newIconY - 6;
  // svgGroup_ = null;
  var prevHeight = svgGroup_.innerHTML.substring(
    svgGroup_.innerHTML.indexOf('" height="') + 10,
    svgGroup_.innerHTML.indexOf('" rx="')
  );

  var prevIconYY = svgGroup_.innerHTML.substring(
    svgGroup_.innerHTML.indexOf('x="42" y="') + 10,
    svgGroup_.innerHTML.indexOf('x="42" y="') + 12
  );

  // console.log("newHeight : " + newHeight);
  // console.log("prevHeight : " + prevHeight);
  var preIconY2 = prevIconYY - 6;
  // console.log(newIconY + " " + prevIconYY);

  svgGroup_.innerHTML = svgGroup_.innerHTML.split('height="' + prevHeight + '"').join('height="' + (newHeight) + '"')
  svgGroup_.innerHTML = svgGroup_.innerHTML.split('y="' + prevIconYY + '"').join('y="' + newIconY + '"')
  svgGroup_.innerHTML = svgGroup_.innerHTML.split('y="' + preIconY2 + '"').join('y="' + newIconY2 + '"')


}*/


//if-else icon remove button
Blockly.ControlIcon.prototype.drawRemoveIcon_ = function (svgGroup_) {
  // 백그라운드
  //background
  Blockly.utils.createSvgElement('rect',
    {
      'x': 0,
      'y': -14,
      'width': 25,
      'height': 25,
      'rx': 13,
      'style': 'fill:#ffffff;stroke:#F47A6B;stroke-width:2px;'
    },
    svgGroup_);
  Blockly.utils.createSvgElement('rect',
    {
      'x': 8,
      'y': -3,
      'width': 9,
      'height': 3,
      'rx': 1,
      'style': 'fill:#F47A6B;'
    },
    svgGroup_);
};


Blockly.ControlIcon.drawRemoveIcon_ = function (svgGroup_, op, height) {
  // console.log(op);
  // console.log(height);

  var newHeight = height - 1;

  var newIconY = Math.floor(newHeight / 2) - 1;
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
  // console.log(newIconY + " " + prevIconYY);

  svgGroup_.innerHTML = svgGroup_.innerHTML.split('height="' + prevHeight + '"').join('height="' + (newHeight) + '"')
  svgGroup_.innerHTML = svgGroup_.innerHTML.split('y="' + prevIconYY + '"').join('y="' + newIconY + '"')

};