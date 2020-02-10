var EXTERNAL_LEVEL_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];//, 11, 12, 13, 14];

var blockCategories = function(e) {
    return e[e.Logic = 0] = "Logic",
      e[e.Loop = 1] = "Loop",
      e[e.Math = 2] = "Math",
      e[e.Variables = 3] = "Variables",
      e[e.Functions = 4] = "Functions",
      e
}({});
const level = {};
level.pang = {
  1:{
    1:{
      title: "수업 1 : 넘버팡 테스트 - 1",
      toolboxCategories: [blockCategories.Logic, blockCategories.Loop, blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
      grid: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      ifCount: 1,
      loopCount: 2,
      functionCount: 3
    }
  }
}
var EXTERNAL_SUB_LEVELS = [{
  toolboxCategories: [blockCategories.Logic, blockCategories.Loop, blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
  ifCount: 1,
  loopCount: 2,
  functionCount: 2,
  stepLimit: 700,
  name: "Sub Level 6.1",
  level: 6.1,
},{
  toolboxCategories: [blockCategories.Logic, blockCategories.Loop, blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]],
  ifCount: 1,
  loopCount: 2,
  functionCount: 2,
  stepLimit: 700,
  level: 6.2,
  name: "Sub Level 6.2",
},];

var EXTERNAL_MAIN_LEVELS = [{
  toolboxCategories: [blockCategories.Logic, blockCategories.Loop, blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
  ifCount: 0,
  loopCount: 0,
  functionCount: 4,
  stepLimit: 200,
  name: "Erase it",
  level: 1,
}, {
  toolboxCategories: [blockCategories.Logic, blockCategories.Loop, blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
  ifCount: 0,
  loopCount: 1,
  functionCount: 1,
  stepLimit: 200,
  name: "Line",
  level: 2,
}, {
  toolboxCategories: [blockCategories.Logic, /*blockCategories.Loop,*/ blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
  ifCount: 0,
  loopCount: 1,
  functionCount: 1,
  stepLimit: 200,
  name: "Diagonal",
  level: 3,
}, {
  toolboxCategories: [blockCategories.Logic, blockCategories.Loop, blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
  ifCount: 2,
  loopCount: 2,
  functionCount: 1,
  stepLimit: 400,
  name: "Hatched Diagonal",
  level: 4,
}, {
  toolboxCategories: [blockCategories.Logic, /*blockCategories.Loop*/, blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0]],
  ifCount: 1,
  loopCount: 2,
  functionCount: 1,
  stepLimit: 1e3,
  name: "Uneven",
  level: 5,
}, /*{
 toolboxCategories: [blockCategories.Logic, blockCategories.Loop, blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
 grid: [
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 2, 1, 2, 1, 2, 1, 2, 1, 0],
 [0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 0],
 [0, 0, 2, 1, 2, 1, 2, 1, 2, 1, 0],
 [0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 0],
 [0, 0, 2, 1, 2, 1, 2, 1, 2, 1, 0],
 [0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 0],
 [0, 0, 2, 1, 2, 1, 2, 1, 2, 1, 0],
 [0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
 ifCount: 1,
 loopCount: 2,
 functionCount: 2,
 stepLimit: 700,
 name: "Holes"
 },*/ {
  /**FIXME test game for adaptive demo**/
  toolboxCategories: [blockCategories.Logic, blockCategories.Loop, blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
  ifCount: 1,
  loopCount: 2,
  functionCount: 2,
  stepLimit: 700,
  subLevels:[EXTERNAL_SUB_LEVELS[0], EXTERNAL_SUB_LEVELS[1]],
  rules:[{subLevel:0, rule:{uncompleted:1, outofRange:0}}, {subLevel:1, rule:{uncompleted:0, outofRange:1}}],
  name: "Solid Ones",
  level: 6,
  //all more rules here for the next levels;
  checkRules: function(errors, level  ) {
    for(var i = 0; i < level.rules.length; i++ ) {
      var ruleObj = level.rules[i];
      console.log("checking rule:", ruleObj);

      switch (ruleObj.subLevel) {
        case 0:
          if (ruleObj.rule.uncompleted === errors.uncompleted
            && ruleObj.rule.outofRange === errors.outofRange)
            return this.subLevels[0];
          break;
        case 1:
          if (ruleObj.rule.uncompleted === errors.uncompleted
            && ruleObj.rule.outofRange === errors.outofRange)
            return this.subLevels[1];
          break;
      }
    }
  }
}, {
    toolboxCategories: [blockCategories.Logic, blockCategories.Loop, blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]],
    ifCount: 3,
    loopCount: 2,
    functionCount: 1,
    stepLimit: 2e3,
    name: "Explosion",
    level: 7,
}, {
  toolboxCategories: [blockCategories.Logic, blockCategories.Loop, blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 9],
    [0, 0, 0, 0, 0, 0, 0, 0, 10, 9, 8],
    [0, 0, 0, 0, 0, 0, 0, 10, 9, 8, 7],
    [0, 0, 0, 0, 0, 0, 10, 9, 8, 7, 6],
    [0, 0, 0, 0, 0, 10, 9, 8, 7, 6, 5],
    [0, 0, 0, 0, 10, 9, 8, 7, 6, 5, 4],
    [0, 0, 0, 10, 9, 8, 7, 6, 5, 4, 3],
    [0, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2],
    [0, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
  ifCount: 0,
  loopCount: 3,
  functionCount: 1,
  stepLimit: 3100,
  name: "Criss Cross",
  level: 8,
}, {
  toolboxCategories: [blockCategories.Logic, blockCategories.Loop, blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
  ifCount: 2,
  loopCount: 2,
  functionCount: 1,
  stepLimit: 1400,
  name: "Spiral",
  level: 9,
}, {
  toolboxCategories: [blockCategories.Logic, blockCategories.Loop, blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1]],
  ifCount: 1,
  loopCount: 1,
  functionCount: 1,
  stepLimit: 1400,
  name: "Pattern",
  level: 10,
},{
  toolboxCategories: [blockCategories.Logic, blockCategories.Loop, blockCategories.Math, blockCategories.Variables, blockCategories.Functions],
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
  ifCount: 0,
  loopCount: 2,
  functionCount: 1,
  stepLimit: 1400,
  name: "TEST 11",
  level: 11,
}]
