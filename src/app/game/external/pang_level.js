const allBlock = [
  [
    'Logic',
    'controls_if',
    'controls_ifelse',
    'logic_compare',
    'logic_operation',
    'logic_negate',
    'logic_boolean'
  ],
  [
    'Loop',
    'controls_for/FROM_1.TO_10.BY_1',
    'controls_repeat_ext/TIMES_10',
    'controls_whileUntil'
  ],
  [
    'Math',
    'math_number',
    'math_arithmetic/A_1.B_1',
    'math_modulo/DIVIDEND_1.DIVISOR_1',
    'math_number_property/NUMBER_TO_CHECK_1',
    'math_round'
  ],
  ['Variables/custom="VARIABLE"'],
  ['Command', 'erase/posX_1.posY_1']
];

const level = {
  '001': {
    HC: {
      title: '수업 1 : 넘버팡 테스트 - 1',
      toolBox: ['cate', ...allBlock],
      grid: [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      blockCount: {
        loop: 2,
        command: 1,
        all: 999 //무제한.
      },
      skin: {
        num: '#a246cb',
        zero: '#7607a4',
        minus: '#f9608c'
      }
    }
  }
};
function getPangLevels() {
  return level;
}
var BLOCK_REDUCE_DISABLED = ' disabled="true"';
var BLOCK_LOOP_DISABLED = ' disabled="true"';
var BLOCK_IF_DISABLED = ' disabled="true"';
function generateToolboxXML(t) {
  for (var n = '<xml>', r = 0, i = t; r < i.length; r++)
    switch (i) {
      case 'Logic':
        (n += '<category name="logic" colour="200">'),
          (n += '<block type="controls_if" ' + BLOCK_IF_DISABLED + '></block>'),
          (n +=
            '<block type="controls_if" ' +
            BLOCK_IF_DISABLED +
            '><mutation else="1"></mutation></block>'),
          (n += '<block type="logic_compare" ></block>'),
          (n += '<block type="logic_operation" ></block>'),
          (n += '<block type="logic_negate" ></block>'),
          (n += '<block type="logic_boolean" ></block>'),
          (n += '</category>');
        break;
      case 'Loops':
        (n += '<category name="loops" colour="150">'),
          (n += '<block type="controls_for" ' + BLOCK_LOOP_DISABLED + '>'),
          (n += '<value name="FROM">'),
          (n += '<shadow type="math_number">'),
          (n += '<field name="NUM">1</field>'),
          (n += '</shadow>'),
          (n += '</value>'),
          (n += '<value name="TO" >'),
          (n += '<shadow type="math_number">'),
          (n += '<field name="NUM">10</field>'),
          (n += '</shadow>'),
          (n += '</value>'),
          (n += '<value name="BY">'),
          (n += '<shadow type="math_number">'),
          (n += '<field name="NUM">1</field>'),
          (n += '</shadow>'),
          (n += '</value>'),
          (n += '</block>'),
          (n +=
            '<block type="controls_repeat_ext" ' + BLOCK_LOOP_DISABLED + '>'),
          (n += '<value name="TIMES">'),
          (n += '<shadow type="math_number">'),
          (n += '<field name="NUM">10</field>'),
          (n += '</shadow>'),
          (n += '</value>'),
          (n += '</block>'),
          (n +=
            '<block type="controls_whileUntil" ' +
            BLOCK_LOOP_DISABLED +
            '></block>'),
          (n += '</category>');
        break;
      case 'Math':
        (n += '<category name="math" colour="240">'),
          (n += '<block type="math_number"></block>'),
          (n += '<block type="math_arithmetic">'),
          (n +=
            '<value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value>'),
          (n +=
            '<value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value>'),
          (n += '</block>'),
          (n += '<block type="math_modulo">'),
          (n +=
            '<value name="DIVIDEND"><shadow type="math_number"><field name="NUM">1</field></shadow></value>'),
          (n +=
            '<value name="DIVISOR"><shadow type="math_number"><field name="NUM">1</field></shadow></value>'),
          (n += '</block>'),
          (n += '<block type="math_number_property">'),
          (n +=
            '<value name="NUMBER_TO_CHECK"><shadow type="math_number"><field name="NUM">0</field></shadow></value>'),
          (n += '</block>'),
          (n += '<block type="math_round"></block>'),
          (n += '</category>');
        break;
      case 'Variables':
        n +=
          '<category name="variables" custom="VARIABLE" colour="300"></category>';
        break;
      case 'Eraser':
        (n += '<category name="eraser" colour="360">'),
          (n += '<block type="eraser" ' + BLOCK_REDUCE_DISABLED + '>'),
          (n +=
            '<value name="x"><shadow type="math_number"><field name="NUM">1</field></shadow></value>'),
          (n +=
            '<value name="y"><shadow type="math_number"><field name="NUM">1</field></shadow></value>'),
          (n += '</block>'),
          (n += '</category>');
    }
  return n + '</xml>';
}
export { getPangLevels, generateToolboxXML };
