const allBlock = [
  'moveForward',
  'turnAngle',
  'logic_maze_path_check_1_condition',
  'logic_maze_path_check_2_condition',
  'controls_if_maze_nowcoding',
  'controls_until_maze_nowcoding',
  'controls_repeat_ext/TIMES_10'
];
const level = {
  '001': {
    HC: {
      title: '메이즈 1 : 메이즈 테스트',
      toolBox: [...allBlock],
      grid: [
        [0, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 2, 1],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
        // [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
        // [1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0],
        // [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        // [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        // [1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0],
        // [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
        // [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
        // [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        // [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        // [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]
      ],
      blockCount: {
        loop: 999,
        command: 999,
        all: 10 //무제한.
      },
      skin: {
        gaol: 'basic',
        char: 'basic',
        map: 'grass'
      }
    }
  }
};
function getMazeLevels() {
  return level;
}
// `<xml id="toolbox" style="display: none">
//   <category name="Logic" colour="#2e79ee">
//     <block type="moveForward"></block>
//     <block type="turnAngle">
//       <field name="ANGLE">TURNLEFT90</field>
//     </block>
//     <block type="logic_maze_path_check_1_condition"></block>
//     <block type="logic_maze_path_check_2_condition"></block>
//     <block type="controls_if_maze_nowcoding"></block>
//     <block type="controls_until_maze_nowcoding"></block>
//     <block type="controls_repeat_ext">
//       <value name="TIMES">
//         <block type="math_number">
//           <field name="NUM">10</field>
//         </block>
//       </value>
//     </block>
//   </category>
//   <category name="Math" colour="#2b03d3">
//     <block type="moveForward"></block>
//   </category>
//   <category name="Loop" colour="#e02157">
//     <block type="moveForward"></block>
//   </category>
//   <category name="Variables" colour="#3e9b02">
//     <block type="moveForward"></block>
//   </category>
//   <category name="Delete" colour="#cc0000">
//     <block type="moveForward"></block>
//   </category>
// </xml>`

export { getMazeLevels };
