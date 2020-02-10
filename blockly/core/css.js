/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview Inject Blockly's CSS synchronously.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * @name Blockly.Css
 * @namespace
 */
goog.provide('Blockly.Css');


/**
 * List of cursors.
 * @enum {string}
 */
Blockly.Css.Cursor = {
  OPEN: 'handopen',
  CLOSED: 'handclosed',
  DELETE: 'handdelete'
};

/**
 * Current cursor (cached value).
 * @type {string}
 * @private
 */
Blockly.Css.currentCursor_ = '';

/**
 * Large stylesheet added by Blockly.Css.inject.
 * @type {Element}
 * @private
 */
Blockly.Css.styleSheet_ = null;

/**
 * Path to media directory, with any trailing slash removed.
 * @type {string}
 * @private
 */
Blockly.Css.mediaPath_ = '';

/**
 * Inject the CSS into the DOM.  This is preferable over using a regular CSS
 * file since:
 * a) It loads synchronously and doesn't force a redraw later.
 * b) It speeds up loading by not blocking on a separate HTTP transfer.
 * c) The CSS content may be made dynamic depending on init options.
 * @param {boolean} hasCss If false, don't inject CSS
 *     (providing CSS becomes the document's responsibility).
 * @param {string} pathToMedia Path from page to the Blockly media directory.
 */
Blockly.Css.inject = function (hasCss, pathToMedia) {
  // Only inject the CSS once.
  if (Blockly.Css.styleSheet_) {
    return;
  }
  // Placeholder for cursor rule.  Must be first rule (index 0).
  var text = '.blocklyDraggable {}\n';
  if (hasCss) {
    text += Blockly.Css.CONTENT.join('\n');
    if (Blockly.FieldDate) {
      text += Blockly.FieldDate.CSS.join('\n');
    }
  }
  // Strip off any trailing slash (either Unix or Windows).
  Blockly.Css.mediaPath_ = pathToMedia.replace(/[\\\/]$/, '');
  text = text.replace(/<<<PATH>>>/g, Blockly.Css.mediaPath_);
  // Inject CSS tag at start of head.
  var cssNode = document.createElement('style');
  document.head.insertBefore(cssNode, document.head.firstChild);

  var cssTextNode = document.createTextNode(text);
  cssNode.appendChild(cssTextNode);
  Blockly.Css.styleSheet_ = cssNode.sheet;
};

/**
 * Set the cursor to be displayed when over something draggable.
 * See See https://github.com/google/blockly/issues/981 for context.
 * @param {Blockly.Css.Cursor} cursor Enum.
 * @deprecated April 2017.
 */
Blockly.Css.setCursor = function (cursor) {
  console.warn('Deprecated call to Blockly.Css.setCursor.' +
    'See https://github.com/google/blockly/issues/981 for context');
};

/**
 * Array making up the CSS content for Blockly.
 */
Blockly.Css.CONTENT = [

    '.blocklyMainBackground:hover {',
    'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
    'cursor: grab;',
    'cursor: -webkit-grab;',
    '}',

  '.blocklySvg {',
  'outline: none;',
  'overflow: hidden;',  /* IE overflows by default. */
  'position: absolute;',
  'display: block;',
  '}',

  '.blocklyWidgetDiv {',
  'display: none;',
  'position: absolute;',
  'z-index: 99999;', /* big value for bootstrap3 compatibility */
  '}',

  '.injectionDiv {',
  'height: 100%;',
  'position: relative;',
  'overflow: hidden;', /* So blocks in drag surface disappear at edges */
  'touch-action: none',
  '}',

  '.blocklyNonSelectable {',
  'user-select: none;',
  '-moz-user-select: none;',
  '-ms-user-select: none;',
  '-webkit-user-select: none;',
  '}',

  '.blocklyWsDragSurface {',
  'display: none;',
  'position: absolute;',
  'top: 0;',
  'left: 0;',
  '}',
  /* Added as a separate rule with multiple classes to make it more specific
     than a bootstrap rule that selects svg:root. See issue #1275 for context.
  */
  '.blocklyWsDragSurface.blocklyOverflowVisible {',
  'overflow: visible;',
  '}',

  '.blocklyBlockDragSurface {',
  'display: none;',
  'position: absolute;',
  'top: 0;',
  'left: 0;',
  'right: 0;',
  'bottom: 0;',
  'overflow: visible !important;',
  'z-index: 50;', /* Display below toolbox, but above everything else. */
  '}',

  '.blocklyBlockCanvas.blocklyCanvasTransitioning,',
  '.blocklyBubbleCanvas.blocklyCanvasTransitioning {',
  'transition: transform .5s;',
  '}',

  '.blocklyTooltipDiv {',
  'background-color: #ffffc7;',
  'border: 1px solid #ddc;',
  'box-shadow: 4px 4px 20px 1px rgba(0,0,0,.15);',
  'color: #000;',
  'display: none;',
  'font-family: sans-serif;',
  'font-size: 9pt;',
  'opacity: .9;',
  'padding: 2px;',
  'position: absolute;',
  'z-index: 100000;', /* big value for bootstrap3 compatibility */
  '}',

  '.blocklyResizeSE {',
  'cursor: se-resize;',
  'fill: #aaa;',
  '}',

  '.blocklyResizeSW {',
  'cursor: sw-resize;',
  'fill: #aaa;',
  '}',

  '.blocklyResizeLine {',
  'stroke: #515A5A;',
  'stroke-width: 1;',
  '}',

  '.blocklyHighlightedConnectionPath {',
  'fill: none;',
  'stroke: #fc3;',
  'stroke-width: 4px;',
  '}',

  '.blocklyPathLight {',
  'fill: none;',
  'stroke-linecap: round;',
  'stroke-width: 1;',
  // 'display: none;',
  '}',

  '.blocklySelected>.blocklyPath {',
  // 선택된 블록
  '}',

  '.blocklySelected>.blocklyPathLight {',
  'display: none;',
  '}',

  '.blocklyDraggable {',
  /* backup for browsers (e.g. IE11) that don't support grab */
  'cursor: url("<<<PATH>>>/handopen.cur"), auto;',
  'cursor: grab;',
  'cursor: -webkit-grab;',
  '}',



  '.blocklyDraggable > g.blocklyDraggable > path.blocklyPathDark{',
  'display: none;',
  '}',

  'g.blocklyDraggable.NowcodingInlineBlock > g.blocklyDraggable > path.blocklyPathDark{',
  'display: none;',
  '}',


  '.blocklyDraggable > g.NOWCODING_SHADOW > path.blocklyPathDark{',
  'display: none;',
  '}',



  '.blocklyDragging {',
  /* backup for browsers (e.g. IE11) that don't support grabbing */
  'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
  'cursor: grabbing;',
  'cursor: -webkit-grabbing;',
  '}',
  /* Changes cursor on mouse down. Not effective in Firefox because of
    https://bugzilla.mozilla.org/show_bug.cgi?id=771241 */
  '.blocklyDraggable:active {',
  /* backup for browsers (e.g. IE11) that don't support grabbing */
  'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
  'cursor: grabbing;',
  'cursor: -webkit-grabbing;',
  '}',
  /* Change the cursor on the whole drag surface in case the mouse gets
     ahead of block during a drag. This way the cursor is still a closed hand.
   */
  '.blocklyBlockDragSurface .blocklyDraggable {',
  /* backup for browsers (e.g. IE11) that don't support grabbing */
  'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
  'cursor: grabbing;',
  'cursor: -webkit-grabbing;',
  '}',

  '.blocklyDragging.blocklyDraggingDelete {',
  'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',
  '}',

  '.blocklyToolboxDelete {',
  'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',
  '}',

  '.blocklyToolboxGrab {',
  'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
  'cursor: grabbing;',
  'cursor: -webkit-grabbing;',
  '}',

  '.blocklyDragging>.blocklyPath,',
  '.blocklyDragging>.blocklyPathLight {',
  'fill-opacity: .8;',
  'stroke-opacity: .8;',
  '}',

  '.blocklyDragging>.blocklyPathDark {',
  'display: none;',
  '}',

  '.blocklyDisabled>.blocklyPath {',
  'fill-opacity: .5;',
  'stroke-opacity: .5;',
  '}',

  '.blocklyDisabled>.blocklyPathLight,',
  '.blocklyDisabled>.blocklyPathDark {',
  'display: none;',
  '}',

  '.blocklyText {',
  'cursor: default;',
  'fill: #fff;',
  'font-family: Monaco,Menlo,Ubuntu Mono,Consolas,source-code-pro,monospace!important;',
  'font-size: 11pt;',
  '}',

  '.blocklyNonEditableText>text {',
  'pointer-events: none;',
  '}',

  '.blocklyNonEditableText>rect,',
  '.blocklyEditableText>rect {',
  'fill: #fff;',
  'fill-opacity: 0;',
  'stroke: rgba(0,0,0,.2);',
  'stroke-width: 1;',
  'transition: all .3s;',
  '}',

  '.blocklyNonEditableText>text,',
  '.blocklyEditableText>text {',
  'fill: #fff;',
  '}',

  '.blocklyNonEditableText>text>tspan,',
  '.blocklyEditableText>text>tspan {',
  'fill: #fff!important;',
  '}',

  '.blocklyEditableText:hover>rect {',
  'stroke: rgba(0,0,0,.6);',
  '}',






  '.blocklyNonEditableText>rect,',
  '.blocklyEditableText.fieldDropdown>rect {',
  '}',

  '.blocklyEditableText.fieldDropdown>rect:after {',
  'content: "dd";',
  '}',

  '.blocklyNonEditableText>text,',
  '.blocklyEditableText.fieldDropdown>text {',
  'fill: #fff;',
  'font-size: 10pt;',
  '}',

  '.blocklyNonEditableText>text>tspan,',
  '.blocklyEditableText.fieldDropdown>text>tspan {',
  'overflow: hidden;',
  'width: 50px;',
  'text-indent: -9999px;',
  '}',

  '.blocklyEditableText.fieldDropdown:hover>rect {',
  'stroke: rgba(0,0,0,.6);',

  '}',






  '.blocklyBubbleText {',
  'fill: #000;',
  '}',

  '.blocklyFlyout {',
  'position: absolute;',
  'z-index: 20;',
  '}',
  '.blocklyFlyoutButton {',
  'fill: #888;',
  'cursor: default;',
  '}',

  '.blocklyFlyoutButtonShadow {',
  'fill: #666;',
  '}',

  '.blocklyFlyoutButton:hover {',
  'fill: #aaa;',
  '}',

  '.blocklyFlyoutLabel {',
  'cursor: default;',
  '}',

  '.blocklyFlyoutLabelBackground {',
  'opacity: 0;',
  '}',

  '.blocklyFlyoutLabelText {',
  'fill: #000;',
  '}',

  /*
    Don't allow users to select text.  It gets annoying when trying to
    drag a block and selected text moves instead.
  */
  '.blocklySvg text, .blocklyBlockDragSurface text {',
  'user-select: none;',
  '-moz-user-select: none;',
  '-ms-user-select: none;',
  '-webkit-user-select: none;',
  'cursor: inherit;',
  '}',

  '.blocklyHidden {',
  'display: none;',
  '}',

  '.blocklyFieldDropdown:not(.blocklyHidden) {',
  'display: block;',
  '}',

  '.blocklyIconGroup {',
  'cursor: default;',
  '}',

  '.blocklyIconGroup:not(:hover),',
  '.blocklyIconGroupReadonly {',
  'opacity: .6;',
  '}',

  '.blocklyIconShape {',
  'fill: #00f;',
  'stroke: #fff;',
  'stroke-width: 1px;',
  '}',

  '.blocklyIconSymbol {',
  'fill: #fff;',
  '}',

  '.blocklyMinimalBody {',
  'margin: 0;',
  'padding: 0;',
  '}',

  '.blocklyCommentForeignObject {',
  'position: relative;',
  'z-index: 0;',
  '}',

  '.blocklyCommentRect {',
  'fill: #E7DE8E;',
  'stroke: #bcA903;',
  'stroke-width: 1px',
  '}',

  '.blocklyCommentTarget {',
  'fill: transparent;',
  'stroke: #bcA903;',
  '}',

  '.blocklyCommentTargetFocused {',
  'fill: none;',
  '}',

  '.blocklyCommentHandleTarget {',
  'fill: none;',
  '}',

  '.blocklyCommentHandleTargetFocused {',
  'fill: transparent;',
  '}',

  '.blocklyFocused>.blocklyCommentRect {',
  'fill: #B9B272;',
  'stroke: #B9B272;',
  '}',

  '.blocklySelected>.blocklyCommentTarget {',
  'stroke: #fc3;',
  'stroke-width: 3px;',
  '}',


  '.blocklyCommentTextarea {',
  'background-color: #fef49c;',
  'border: 0;',
  'outline: 0;',
  'margin: 0;',
  'padding: 3px;',
  'resize: none;',
  'display: block;',
  'overflow: hidden;',
  '}',

  '.blocklyCommentDeleteIcon {',
  'cursor: pointer;',
  'fill: #000;',
  'display: none',
  '}',

  '.blocklySelected > .blocklyCommentDeleteIcon {',
  'display: block',
  '}',

  '.blocklyDeleteIconShape {',
  'fill: #000;',
  'stroke: #000;',
  'stroke-width: 1px;',
  '}',

  '.blocklyDeleteIconShape.blocklyDeleteIconHighlighted {',
  'stroke: #fc3;',
  '}',

  '.blocklyHtmlInput {',
  'border: none;',
  'display: block;',
  'margin: 13px auto;',
  'position: relative;',
  'background: #f67290;',
  'border-radius: 2px;',
  'font-family: sans-serif;',
  'outline: none;',
  'padding: 0px;',
  'width: 80%;',
  'text-align:center;',
  '}',

  '.blocklyMainBackground {',
  'opacity:.6;',
  '-moz-user-select: -moz-none;',
  '-webkit-user-select: none;',
  '-ms-user-select: none;',
  'user-select: none;',
  '}',

  '.blocklyMutatorBackground {',
  'fill: #fff;',
  'stroke: #ddd;',
  'stroke-width: 1;',
  '}',

  '.blocklyFlyoutBackground {',
  'fill: #000;',
  'fill-opacity: .2;',
  '}',

  '.blocklyTransparentBackground {',
  'opacity: 0;',
  '}',

  '.blocklyMainWorkspaceScrollbar {',
  'z-index: 20;',
  '}',

  '.blocklyFlyoutScrollbar {',
  'z-index: 30;',
  '}',

  '.blocklyScrollbarHorizontal, .blocklyScrollbarVertical {',
  'position: absolute;',
  'outline: none;',
  '}',

  '.blocklyScrollbarBackground {',
  'opacity: 0;',
  '}',

  '.blocklyScrollbarHandle {',
  'fill: #fff;',
  'opacity: .05;',
  '}',

  '.blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,',
  '.blocklyScrollbarHandle:hover {',
  'fill: #bbb;',
  '}',

  '.blocklyZoom>image {',
  'opacity: .4;',
  '}',

  '.blocklyZoom>image:hover {',
  'opacity: .6;',
  '}',

  '.blocklyZoom>image:active {',
  'opacity: .8;',
  '}',

  /* Darken flyout scrollbars due to being on a grey background. */
  /* By contrast, workspace scrollbars are on a white background. */
  '.blocklyFlyout .blocklyScrollbarHandle {',
  'fill: #bbb;',
  '}',

  '.blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,',
  '.blocklyFlyout .blocklyScrollbarHandle:hover {',
  'fill: #aaa;',
  '}',

  '.blocklyInvalidInput {',
  'background: #faa;',
  '}',

  '.blocklyAngleCircle {',
  'stroke: #444;',
  'stroke-width: 1;',
  'fill: #ddd;',
  'fill-opacity: .8;',
  '}',

  '.blocklyAngleMarks {',
  'stroke: #444;',
  'stroke-width: 1;',
  '}',

  '.blocklyAngleGauge {',
  'fill: #f88;',
  'fill-opacity: .8;',
  '}',

  '.blocklyAngleLine {',
  'stroke: #f00;',
  'stroke-width: 2;',
  'stroke-linecap: round;',
  'pointer-events: none;',
  '}',

  '.blocklyContextMenu {',
  'border-radius: 4px;',
  '}',

  '.blocklyDropdownMenu {',
  'padding: 0 !important;',
  '}',

  '.blocklyDropdownMenu:focus {',
  'outline: none;',
  '}',

  /* Override the default Closure URL. */
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {',
  'border-left:2px solid #fff;',
  '}',

  /* Category tree in Toolbox. */
  '.blocklyToolboxDiv {',
  'background-color: #ddd;',
  'overflow-x: visible;',
  'overflow-y: auto;',
  'position: absolute;',
  'user-select: none;',
  '-moz-user-select: none;',
  '-ms-user-select: none;',
  '-webkit-user-select: none;',
  'z-index: 70;', /* so blocks go under toolbox when dragging */
  '-webkit-tap-highlight-color: transparent;', /* issue #1345 */
  '}',

  '.blocklyTreeRoot {',
  'padding: 4px 0;',
  '}',

  '.blocklyTreeRoot:focus {',
  'outline: none;',
  '}',

  '.blocklyTreeRow {',
  'height: 22px;',
  'line-height: 22px;',
  'margin-bottom: 3px;',
  'padding-right: 8px;',
  'white-space: nowrap;',
  '}',

  '.blocklyHorizontalTree {',
  'float: left;',
  'margin: 1px 5px 8px 0;',
  '}',

  '.blocklyHorizontalTreeRtl {',
  'float: right;',
  'margin: 1px 0 8px 5px;',
  '}',

  '.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {',
  'margin-left: 8px;',
  '}',

  '.blocklyTreeRow:not(.blocklyTreeSelected):hover {',
  'background-color: #e4e4e4;',
  '}',

  '.blocklyTreeSeparator {',
  'border-bottom: solid #e5e5e5 1px;',
  'height: 0;',
  'margin: 5px 0;',
  '}',

  '.blocklyTreeSeparatorHorizontal {',
  'border-right: solid #e5e5e5 1px;',
  'width: 0;',
  'padding: 5px 0;',
  'margin: 0 5px;',
  '}',


  '.blocklyTreeIcon {',
  'background-image: url(<<<PATH>>>/sprites.png);',
  'height: 16px;',
  'vertical-align: middle;',
  'width: 16px;',
  '}',

  '.blocklyTreeIconClosedLtr {',
  'background-position: -32px -1px;',
  '}',

  '.blocklyTreeIconClosedRtl {',
  'background-position: 0 -1px;',
  '}',

  '.blocklyTreeIconOpen {',
  'background-position: -16px -1px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconClosedLtr {',
  'background-position: -32px -17px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconClosedRtl {',
  'background-position: 0 -17px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconOpen {',
  'background-position: -16px -17px;',
  '}',

  '.blocklyTreeIconNone,',
  '.blocklyTreeSelected>.blocklyTreeIconNone {',
  'background-position: -48px -1px;',
  '}',

  '.blocklyTreeLabel {',
  'cursor: default;',
  'font-family: sans-serif;',
  'font-size: 16px;',
  'padding: 0 3px;',
  'vertical-align: middle;',
  '}',

  '.blocklyToolboxDelete .blocklyTreeLabel {',
  'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',
  '}',

  '.blocklyTreeSelected .blocklyTreeLabel {',
  'color: #fff;',
  '}',

  /* Colour Picker Field */
  '.blocklyColourTable {',
  'border-collapse: collapse;',
  '}',

  '.blocklyColourTable>tr>td {',
  'border: 1px solid #666;',
  'padding: 0;',
  '}',

  '.blocklyColourTable>tr>td>div {',
  'border: 1px solid #666;',
  'height: 13px;',
  'width: 15px;',
  '}',

  '.blocklyColourTable>tr>td>div:hover {',
  'border: 1px solid #fff;',
  '}',

  '.blocklyColourSelected, .blocklyColourSelected:hover {',
  'border: 1px solid #000 !important;',
  '}',

  /* Copied from: goog/css/menu.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  '.blocklyWidgetDiv {',
  'outline: none;',
  'max-height: 100%;',
  'z-index: 20000;',  /* Arbitrary, but some apps depend on it... */
  'border-radius: 4px;',
  'overflow: hidden;',
  '}',

    '.blocklyWidgetDiv:after {',
        'float: none;',
        'display: block;',
    '}',

  /* Copied from: goog/css/menuitem.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuItemRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  /**
   * State: resting.
   *
   * NOTE(mleibman,chrishenry):
   * The RTL support in Closure is provided via two mechanisms -- "rtl" CSS
   * classes and BiDi flipping done by the CSS compiler.  Closure supports RTL
   * with or without the use of the CSS compiler.  In order for them not to
   * conflict with each other, the "rtl" CSS classes need to have the #noflip
   * annotation.  The non-rtl counterparts should ideally have them as well,
   * but, since .goog-menuitem existed without .goog-menuitem-rtl for so long
   * before being added, there is a risk of people having templates where they
   * are not rendering the .goog-menuitem-rtl class when in RTL and instead
   * rely solely on the BiDi flipping by the CSS compiler.  That's why we're
   * not adding the #noflip to .goog-menuitem.
   */
  '.blocklyWidgetDiv .goog-menuitem {',
  'font: normal 13px Arial, sans-serif;',
  'list-style: none;',
  'background: #5f5aa6;',
  'border-bottom: 1px solid rgba(255,255,255,.1);',
  'margin: 0;',
  'cursor: pointer;',
  'transition: all .2s;',
  '}',

  '.blocklyWidgetDiv .goog-menu:before {',
  'width: 0; ',
  'height: 0; ',
  'border-left: 5px solid transparent;',
  'border-right: 5px solid transparent;',
  'border-bottom: 5px solid black;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem:last-child {',
  'border-bottom: none;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem:after {',
  'display: block;',
  'float: left;',
  '}',

  /* BiDi override for the resting state. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl {',
  /* Flip left/right padding for BiDi. */
  'padding-left: 7em;',
  'padding-right: 28px;',
  '}',

  /* If a menu doesn't have checkable items or items with icons,
   * remove padding.
   */
  '.blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,',
  '.blocklyWidgetDiv .goog-menu-noicon .goog-menuitem {',
  'padding-left: 12px;',
  '}',

  /* If a menu doesn't have items with shortcuts, leave just enough room for
   * submenu arrows, if they are rendered.
   */
  '.blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem {',
  'padding-right: 20px;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-content {',
  'padding: 0px 10px 0 10px;',
  'position: relative;',
  'color: #fff;',
  'font-size: 13px;',
  'height: 36px;',
  'line-height: 36px;',
  'font-family: Consolas, Menlo, Monaco, PT Mono, Calibri, serif, Sans-serif, Arial, Verdana;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-content img {',
  'position: relative;',
  'margin: 0px 0 0 -8px;',
  'z-index: 1;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-content #text {',
  'font-size: 13px;',
  '}',

  /* State: disabled. */
  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel,',
  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content {',
  'color: rgba(255,255,255,.4) !important;',
  'cursor: not-allowed;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon {',
  'opacity: 0.3;',
  'filter: alpha(opacity=30);',
  '}',

  /* State: hover. */
  '.blocklyWidgetDiv .goog-menuitem-highlight,',
  '.blocklyWidgetDiv .goog-menuitem-hover {',
  'background-color: #4c4885;',
  '}',

  /* State: selected/checked. */
  '.blocklyWidgetDiv .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-menuitem-icon {',
  'position: absolute;',
  'left: 0;',
  'box-sizing: border-box;',
  'background-color: #4c4885;',
  'background-repeat: no-repeat;',
  'width: 34px;',
  'height: 36px;',
  '}',

  /* BiDi override for the selected/checked state. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon {',
  /* Flip left/right positioning. */
  'left: auto;',
  'right: 6px;',
  '}',

  /* Keyboard shortcut ("accelerator") style. */
  '.blocklyWidgetDiv .goog-menuitem-accel {',
  'color: #999;',
  /* Keyboard shortcuts are untranslated; always left-to-right. */
  /* #noflip */
  'direction: ltr;',
  'left: auto;',
  'padding: 0 6px;',
  'position: absolute;',
  'right: 0;',
  'text-align: right;',
  '}',

  /* BiDi override for shortcut style. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel {',
  /* Flip left/right positioning and text alignment. */
  'left: 0;',
  'right: auto;',
  'text-align: left;',
  '}',

  /* Mnemonic styles. */
  '.blocklyWidgetDiv .goog-menuitem-mnemonic-hint {',
  'text-decoration: underline;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-mnemonic-separator {',
  'color: #999;',
  'font-size: 12px;',
  'padding-left: 4px;',
  '}',

  /* Copied from: goog/css/menuseparator.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuSeparatorRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  '.blocklyWidgetDiv .goog-menuseparator {',
  'border-top: 1px solid #ccc;',
  'margin: 4px 0;',
  'padding: 0;',
  '}',


  '.nowcoding_cursor {',
  'cursor: pointer;',
  '}',

  '.NOWCODING_MATHNUM .blocklyEditableText > rect,',
  '.NOWCODING_DROPDOWN .blocklyEditableText > rect,',
  '.NOWCODING_SHADOW .blocklyEditableText > rect{',
  'stroke-width: 0;',
  '}',

  ''
];
