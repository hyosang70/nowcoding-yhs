import { Injectable } from '@angular/core';
import { RandomService } from '../util/random.service';

import * as acorn from 'acorn';

declare var Blockly: any;

@Injectable({
  providedIn: 'root'
})
export class JstoblockService {
  logging: boolean;
  lastBlockId: any;

  level: number;

  loopCount: number;
  functionCount: number;
  ifCount: number;

  usedLoops: number;
  usedFunctions: number;
  usedIfs: number;

  constructor(public randomService: RandomService) {}

  public log(...args) {
    console.log(...args);
  }
/*   public updateCount(app) {
    this.loopCount = app.loopCount;
    this.functionCount = app.functionCount;
    this.ifCount = app.ifCount;
    this.log(
      'Limits: Loops:',
      this.loopCount,
      'Funcs:',
      this.functionCount,
      'Ifs:',
      this.ifCount
    );
  }

  public updateUsed(app) {
    this.usedLoops = app.usedLoops;
    this.usedFunctions = app.usedFunctions;
    this.usedIfs = app.usedIfs;
    this.log(
      'Used: Loops:',
      this.usedLoops,
      'Funcs:',
      this.usedFunctions,
      'Ifs:',
      this.usedIfs
    )
  } */

  public createElement(tagName) {
    return document.createElement(tagName);
  }

  public createTextNode(text) {
    return document.createTextNode(text);
  }

  public createField(value, name, variableType, addId) {
    const element = this.createElement('field');
    element.appendChild(this.createTextNode(value));
    element.setAttribute('name', name);
    if (variableType) {
      element.setAttribute('variabletype', variableType);
    }
    if (addId) {
      element.setAttribute('id', Blockly.utils.genUid());
    }
    return element;
  }

  public createValue(name) {
    const element = this.createElement('value');
    element.setAttribute('name', name);
    return element;
  }

  public createShadow(type) {
    const element = this.createElement('shadow');
    element.setAttribute('type', type);
    element.setAttribute('id', Blockly.utils.genUid());
    return element;
  }

  public createVariable(name, type) {
    const element = this.createElement('variable');
    element.appendChild(this.createTextNode(name));
    element.setAttribute('type', type);
    element.setAttribute('id', Blockly.utils.genUid());
    return element;
  }

  // public createVariables(variables) {
  public createVariables() {
    const variables = this.createElement('variables');
    for (let i = 0, variable; (variable = variables[i]); i++) {
      const element = this.createVariable(
        variable.name,
        variable.getId()
        // this.getVarType(variable.value)
        // name, type만 줄수 있는데 3개를 주네? 무엇?
      );
      variables.appendChild(element);
    }
    return variables;
  }

  public createBlock(type) {
    const element = this.createElement('block');
    const id = Blockly.utils.genUid();
    element.setAttribute('id', id);

    if (!this.lastBlockId) {
      this.lastBlockId = id;
    }

    if (type) {
      element.setAttribute('type', type);
    }
    const xy = this.randomService.random(20, 60);
    element.setAttribute('x', xy);
    element.setAttribute('y', xy);
    return element;
  }

  public createStatement(name) {
    this.log('createStatement');
    const element = this.createElement('statement');
    element.setAttribute('name', name);
    return element;
  }

  public createBlockStatement(child) {
    this.log('createBlockStatement', child);
    if (child.body.length === 0) {
      return;
    }

    const element = this.createBlock('createBlockStatement');
    return element;
  }

  // if loop
  public createIfStatement(child){
    this.log('createIfStatement', child);

    let element = this.createBlock('controls_if');

    return element;
  }

  public createIfElseStatement(child){
    this.log('createIfElseStatement', child);

    let element = this.createBlock('controls_ifelse');

    return element;
  }

  // for loop
  public createForRepeatStatement(child) {
    this.log('createForRepeatStatement', child);
    const element = this.createBlock('controls_repeat_ext');

    const timesValue = this.createValue('TIMES');
    const timesShadow = this.createShadow('math_number');
    const timesShadowField = this.createField(
      child.test.right.value,
      'NUM',
      null,
      false
    );

    timesShadow.appendChild(timesShadowField);
    timesValue.appendChild(timesShadow);
    element.appendChild(timesValue);

    const statement = this.createStatement('DO');
    const statementBlock = this.parseBody(child.body.body[0]);

    if (statementBlock) {
      statement.appendChild(statementBlock);
      element.appendChild(statement);
    }

    return element;
  }

  public createForCountStatement(child) {
    this.log('createForCountStatement', child);
    let element = this.createBlock('controls_for');

    element = this.parseAssignmentExpression(child.init, element);

    const toValue = this.createValue('TO');
    const toShadow = this.createShadow('math_number');
    const toShadowField = this.createField(
      child.test.right.value,
      'NUM',
      null,
      null
    );

    toShadow.appendChild(toShadowField);
    toValue.appendChild(toShadow);

    let updateValue;
    if (child.test.right.value > child.init.right.value) {
      updateValue = 1;
    } else {
      updateValue = -1;
    }

    const byValue = this.createValue('BY');
    const byShadow = this.createShadow('math_number');
    const ByShadowField = this.createField(updateValue, 'NUM', null, null);

    byShadow.appendChild(ByShadowField);
    byValue.appendChild(byShadow);

    element.appendChild(toValue);
    element.appendChild(byValue);

    const statement = this.createStatement('DO');
    const statementBlock = this.parseBody(child.body.body[0]);

    if (statementBlock) {
      statement.appendChild(statementBlock);
      element.appendChild(statement);
    }

    return element;
  }

  public createExpressionBlock(child) {
    this.log('createExpressionBlock', child);


    
    // erase block
    if(child.expression.type == "CallExpression"){
      const exprSettings = this.getSupportedExpression(
        child.expression.callee
          ? child.expression.callee.name
          : child.expression.name
      );

      if (!exprSettings) {
        this.log('not valid expression');
        return;
      }
  
      const element = this.createBlock(child.expression.callee.name);
      let value, shadow, block, blockField, shadowField;
  
      for (let i = 0; i < child.expression.arguments.length; i++) {
        const arg = child.expression.arguments[i];
  
        const argValue = arg.value ? arg.value : exprSettings.types[i];
        const types = this.getVarType(argValue);
  
        value = this.createValue(exprSettings.args[i]);
        shadow = this.createShadow(types.type);
        shadowField = this.createField(argValue, types.name, null, null);
        shadow.appendChild(shadowField);
        value.appendChild(shadow);
  
        if (arg.type === 'Identifier') {
          block = this.createBlock('variables_get');
          blockField = this.createField(arg.name, 'VAR', null, null);
          block.appendChild(blockField);
          value.appendChild(block);
        }
        element.appendChild(value);
      }
  
      return element;
    }

    // ==, !=, <, <=, >, >= 
    else if(child.expression.type == 'BinaryExpression'){
      if(child.expression.operator == "=="){
        const element = this.createBlock('logic_compare');
        const field = this.createField('EQ', 'OP', null, null);

        element.appendChild(field);

        return element;
      }
      else if(child.expression.operator == "!="){
        const element = this.createBlock('logic_compare');
        const field = this.createField('NEQ', 'OP', null, null);

        element.appendChild(field);

        return element;

      }
      else if(child.expression.operator == "<"){
        const element = this.createBlock('logic_compare');
        const field = this.createField('LT', 'OP', null, null);

        element.appendChild(field);
        return element;
      }
      else if(child.expression.operator == "<="){
        const element = this.createBlock('logic_compare');
        const field = this.createField('LTE', 'OP', null, null);

        element.appendChild(field);
        return element;

      }

      else if(child.expression.operator == ">"){
        const element = this.createBlock('logic_compare');
        const field = this.createField('GT', 'OP', null, null);

        element.appendChild(field);
        return element;

      }
      else if(child.expression.operator == ">="){
        const element = this.createBlock('logic_compare');
        const field = this.createField('GTE', 'OP', null, null);

        element.appendChild(field);
        return element;
      }
      
    }

    // and, or
    else if(child.expression.type == 'LogicalExpression'){
      if(child.expression.operator == '&&'){
        const element = this.createBlock('logic_operation');

        const field = this.createField('AND', 'OP', null, null);

        element.appendChild(field);

        return element;
      }
      else{
        let element = this.createBlock('logic_operation');

        const field = this.createField('OR', 'OP', null, null);

        element.appendChild(field)

        return element;
      }
        
    }
    // not
    else if(child.expression.type == 'UnaryExpression'){
      if(child.expression.operator == '!'){
        const element = this.createBlock('logic_negate');

        return element;
      }
    }
    // true or false
    else if(child.expression.type == "Literal"){
      let element = this.createBlock('logic_boolean');
      
      const field = this.createField(child.expression.raw.toUpperCase(), 'BOOL', null, null);
      
      element.appendChild(field);

      return element;
      
    }

  }

  public getSupportedExpression(name) {
    const validFunction = {
      erase: {
        args: ['posX', 'posY'],
        types: [0, 0]
      }
    };
    switch (name) {
      case 'erase':
        console.log('DEX: getSupportedExpression -> name', name);

        return validFunction.erase;
      default:
        alert('Error: Unsupported expression [' + name + ']');
        return;
    }
  }

  public parseAssignmentExpression(child, element) {
    const field = this.createField(child.left.name, 'VAR', null, null);

    const value = this.createValue('FROM');
    const shadow = this.createShadow('math_number');
    const shadowField = this.createField(child.right.value, 'NUM', null, null);

    shadow.appendChild(shadowField);
    value.appendChild(shadow);

    element.appendChild(field);
    element.appendChild(value);

    return element;
  }

  public parseBody(child) {
    let xml = null;
    let errorMessage = 'Error: Unsupported Javascript: ';

    if (child) {

      // this.log('ParseBody.Child', child);
      switch (child.type) {
        case 'VariableDeclaration':
          this.log('parseBody.VariableDeclaration', child);
          // alert(errorMessage + child.type);
          throw new Error(errorMessage + child.type);
          break;
        case 'ExpressionStatement':
          /* if (this.usedFunctions === this.functionCount) {
            throw new Error(
              'Error: Only ' +
                this.functionCount +
                ' functions allowed for this Level'
            );
            alert(
              'Error: Only ' +
                this.functionCount +
                ' functions allowed for this Level'
            );
            return; 
          }*/

          this.log('parseBody.ExpressionStatement', child);
          xml = this.createExpressionBlock(child);
          break;
        case 'FunctionDeclaration':
          this.log('parseBody.FunctionDeclaration', child);
          throw new Error(errorMessage + child.type);
          alert(errorMessage + child.type);
          break;
        case 'IfStatement':
          this.log('parseBody.IfStatement');
          if(child.alternate != null)
            xml = this.createIfElseStatement(child);
          else
            xml = this.createIfStatement(child);
          break;
        case 'ForInStatement':
          this.log('parseBody.ForInStatement', child);
          throw new Error(errorMessage + child.type);
          alert(errorMessage + child.type);
          break;
        case 'AssignmentExpression':
          this.log('parseBody.AssignmentExpression', child);
          throw new Error(errorMessage + child.type);
          alert(errorMessage + child.type);
          break;
        case 'BlockStatement':
          this.log('parseBody.BlockStatement', child);
          xml = this.createBlockStatement(child);
          break;
        case 'ForStatement':
          this.log('parseBody.ForStatement');
          if (this.usedLoops >= this.loopCount) {
            throw new Error(
              'Error: Only ' +
                this.loopCount +
                ' For Statement allowed for this Level'
            );
            alert(
              'Error: Only ' +
                this.loopCount +
                ' For Statement allowed for this Level'
            );
            return;
          }
          if (!child.init || !child.update || !child.test) {
            throw new Error(
              'Error: For Statement with empty fields Unsupported incomplete!'
            );
            alert(
              'Error: For Statement with empty fields Unsupported incomplete!'
            );
            return;
          }
          errorMessage = "Error: For Statement variables don't match";
          if (child.init.type === 'VariableDeclaration') {
            this.log('parseBody.VariableDeclaration');
            if (
              child.init.declarations[0].id.name !== child.test.left.name ||
              child.init.declarations[0].id.name !== child.update.argument.name
            ) {
              throw new Error(errorMessage);
              alert(errorMessage);
              return;
            } else {
              this.usedLoops++;
              xml = this.createForRepeatStatement(child);
            }
          } else if (child.init.type === 'AssignmentExpression') {
            this.log('parseBody.AssignmentExpression');
            if (
              child.init.left.name !== child.test.left.name ||
              child.init.left.name !== child.update.argument.name
            ) {
              throw new Error(errorMessage);
              alert(errorMessage);
              return;
            } else {
              this.usedLoops++;
              xml = this.createForCountStatement(child);
            }
          }
          break;
      }
    }

    // this.log('parseBody.return: ', xml);
    return xml;
  }

  public getVarType(type: any) {
    switch (typeof type) {
      case 'number':
        return { type: 'math_number', name: 'NUM' };
      case 'boolean':
        return { type: 'logic_boolean', name: 'BOOL' };
      case 'string':
        return { type: 'text', name: 'TEXT' };
      default:
        return { type: 'math_number', name: 'NUM' };
    }
  }

  public convert(codeString: string) {
    return new Promise((resolve, reject) => {
      let parseTree: any;
      let block: any;
      //yhs
    


      try {
        parseTree = acorn.parse(codeString);
        block = this.parseBody(parseTree.body[0]);
        console.log('DEX: convert -> block', block);
      } catch (err) {
        reject('Error: Javascript [ ' + err + ' ] incorrect!');
      }
      if (parseTree.body.length > 1) {
        reject('Error: You can only add ONE statement at a time!');
      }
      if (block) {
        const blockXML = new Document();
        blockXML.appendChild(block);
        console.log('DEX: convert -> blockXML', blockXML);
        resolve(blockXML);
      } else {
        reject('Error: Can not convert block to XML');
      }
    });
  }
}
