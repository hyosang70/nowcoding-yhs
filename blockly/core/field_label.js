/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
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
 * @fileoverview Non-editable text field.  Used for titles, labels, etc.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldLabel');

goog.require('Blockly.Field');
goog.require('Blockly.Tooltip');
goog.require('Blockly.utils');

goog.require('goog.math.Size');


/**
 * Class for a non-editable field.
 * @param {string} text The initial content of the field.
 * @param {string=} opt_class Optional CSS class for the field's text.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldLabel = function (text, opt_class) {
  this.size_ = new goog.math.Size(0, 17.5);
  this.class_ = opt_class;
  this.setValue(text);
  this.tooltip_ = '';
};
goog.inherits(Blockly.FieldLabel, Blockly.Field);

/**
 * Construct a FieldLabel from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (text, and class).
 * @returns {!Blockly.FieldLabel} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldLabel.fromJson = function (options) {
  var text = Blockly.utils.replaceMessageReferences(options['text']);
  return new Blockly.FieldLabel(text, options['class']);
};

/**
 * Editable fields are saved by the XML renderer, non-editable fields are not.
 */
Blockly.FieldLabel.prototype.EDITABLE = false;

/**
 * Install this text on a block.
 */
Blockly.FieldLabel.prototype.init = function () {
  //original code
  if (this.textElement_) {
    // Text has already been initialized once.
    return;
  }


  /**
   * NowCoding code
   * FIXME[15/07/19]: Lee Middlebrook - whats happening here?
   * Move to outside of field.init...
   */
  // ifelse 블록 Do 영역 높이정의_2 - ifelse Do-Block  Define Area Height Definition_2
  let localText = this.text_.replace(/\s+/g, '');
  // console.log("localText:", localText, "this.text_:", this.text_);


  // 블록의 두께 정의_2 - Define the thickness of the block _2
  // NowCodingBlockType 텍스트 위치 정의한다 - NowCodingBlockType Define text location
  let textRenderY = this.size_.height / 2;
  let textRenderX = 0;

  //set initial text label locations base on NowCodingBlockType and localText....
  if (this.sourceBlock_) {
    if ( this.sourceBlock_.NowCodingBlockType === "TextLabelDropdown") {
      textRenderY += 10;

        if (localText === "turn") {
            textRenderY -= 0;
        }

    } else if (this.sourceBlock_.NowCodingBlockType === "TextLabelInputHoleLoop") {
        if (localText === "ofloop") {
            textRenderX += 12;
            textRenderY += 14;
        }

    } else if (this.sourceBlock_.NowCodingBlockType === "TextLabelInputHole") {
        if (localText === "turn") {
            textRenderY -= 2;
        }
    } else if (this.sourceBlock_.NowCodingBlockType === "TextLabelInputHole") {
        if (localText === "path") {
            textRenderY += 0;
        }

    } else if (this.sourceBlock_.NowCodingBlockType === "TextLabel") {
      textRenderY += 10;

    } else if (this.sourceBlock_.NowCodingBlockType === "MathDefault") {
      textRenderY += 4;

    } else if (this.sourceBlock_.NowCodingBlockType === "TextLabelDropdownNonEdge") {
        textRenderY += 13;
        textRenderX -= 10;

    } else if (this.sourceBlock_.NowCodingBlockType === "LoopDefault") {
      if (localText === "repeat" || localText === "times" || localText === "countwith" || localText === "from" || localText === "to" || localText === "by" || localText === "foreachitem" || localText === "inlist") {
        textRenderY += 0;
      }
      if (localText === "times") {
        textRenderX -= 36;
      }

    } else if (this.sourceBlock_.NowCodingBlockType === "LoopDefault_3") {
      if (localText === "repeat" || localText === "times" || localText === "countwith" || localText === "from" || localText === "to" || localText === "by" || localText === "foreachitem" || localText === "inlist") {
        textRenderY += 0;
      }
      if (localText === "times") {
        textRenderX -= 36;
      }

    } else if (this.sourceBlock_.NowCodingBlockType === "LoopDefault_2") {
      if (localText === "repeat" || localText === "times") {
        textRenderY += 12;
      }
      if (localText === "countwith" || localText === "from" || localText === "to" || localText === "by" || localText === "foreachitem" || localText === "inlist") {
        textRenderY += 2;
      }
      if (localText === "to" || localText === "by") {
        // textRenderX -= 30;
      }
      if (localText === "from") {
        // textRenderX += 15;
      }

      if (localText === "foreachitem" || localText === "inlist") {
        textRenderY -= 1;
      }
    } else if (this.sourceBlock_.NowCodingBlockType === "IfTextLabelMutator" || this.sourceBlock_.NowCodingBlockType === "IfElseTextLabelNonMutator") {
      if (localText === "else") {
        textRenderY += 15;
      }
      if (localText === "elseif") {
        textRenderY += 12;
      }
      if (localText === "then") {
        textRenderY += 0;
        textRenderX -= 30;
      }
    }
  }

  //ifelse 블록 Do 영역 높이정의_2 - define ifelse block Do area height_2
  //if문의 경우는 여기에서 filed render Y처리 - If the if statement, here is the filed render Y process
  //FIXME[17/07/19]: Lee Middlebrook - conditions based on text of label..
  if (localText === "if" || localText === "elseif") {
    textRenderY += 0; // okay...
  } else if (localText === "then") {
    textRenderX -= 10;
  } else if (localText === "repeatuntilhome") {
    textRenderY += 13;
  } else if (localText === "do") {
    textRenderY += 5;
  } else if (localText === "else") {

  } else if (localText === "not") {
    textRenderX = 17;
  }

  // Build the DOM.
  //set textElement_ position based on computed X and Y values
  //FIXME[15/07/19]: Lee Middlebrook - magic X - 5 assignment?
  this.textElement_ = Blockly.utils.createSvgElement('text', { 'class': 'blocklyText customField', 'y': textRenderY, 'x': textRenderX - 5 }, null);

  /** *****/

  //original code:

  // this.textElement_ = Blockly.utils.createSvgElement('text',
    // {'class': 'blocklyText', 'y': 0,  'x': textRenderX - 5 }, null);
    // {'class': 'blocklyText', 'y': this.size_.height - 5}, null);
  if (this.class_) {
    Blockly.utils.addClass(this.textElement_, this.class_);
  }
  if (!this.visible_) {
    this.textElement_.style.display = 'none';
  }
  this.sourceBlock_.getSvgRoot().appendChild(this.textElement_);

  if (this.tooltip_) {
    this.textElement_.tooltip = this.tooltip_;
  } else {
    // Configure the field to be transparent with respect to tooltips.
    this.textElement_.tooltip = this.sourceBlock_;
  }
  Blockly.Tooltip.bindMouseEvents(this.textElement_);
  // Force a render.
  this.render_();
};

/**
 * Dispose of all DOM objects belonging to this text.
 */
Blockly.FieldLabel.prototype.dispose = function () {
  if (this.textElement_) {
    Blockly.utils.removeNode(this.textElement_);
    this.textElement_ = null;
  }
};

/**
 * Gets the group element for this field.
 * Used for measuring the size and for positioning.
 * @return {!Element} The group element.
 */
Blockly.FieldLabel.prototype.getSvgRoot = function () {
  return /** @type {!Element} */ (this.textElement_);
};

/**
 * Change the tooltip text for this field.
 * @param {string|!Element} newTip Text for tooltip or a parent element to
 *     link to for its tooltip.
 */
Blockly.FieldLabel.prototype.setTooltip = function (newTip) {
  this.tooltip_ = newTip;
  if (this.textElement_) {
    this.textElement_.tooltip = newTip;
  }
};

//Register or Overrides field type
Blockly.Field.register('field_label', Blockly.FieldLabel);
