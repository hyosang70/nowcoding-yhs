import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  constructor() {}
  translate: object;
  colour: object;
  countBlock: object;

  maxBlockCount: any;
  usedCountBlock: any;

  BLOCK_LOOP_DISABLED = ' disabled="true"';
  BLOCK_command_DISABLED = ' disabled="true"';
  disable = {
    loop: false,
    command: false,
    false: false
  };
  public isLock() {}
  public setMaxBlocks({ loop, command, all }) {
    this.maxBlockCount = {
      loop: loop,
      command: command,
      all: all
    };
  }
  public setUsedBlocks({ loop, command, all }) {
    this.usedCountBlock = {
      loop: loop,
      command: command,
      all: all
    };
    return this.compare(this.maxBlockCount, this.usedCountBlock);
  }
  private compare(max, used) {
    let returnVal = false;
    for (const key in max) {
      if (used.hasOwnProperty(key)) {
        if (used[key] >= max[key]) {
          this.disable[key] = true;
          returnVal = true;
        } else if (used[key] + 1 === max[key]) {
          this.disable[key] = false;
          returnVal = true;
        }
      }
    }
    return returnVal;
  }

  public getCategoryByType(type) {
    this.countBlock = {
      loop: ['controls_for', 'controls_repeat_ext', 'controls_whileUntil'],
      command: ['erase']
    };
    let returnVal = 'false';
    for (const key in this.countBlock) {
      if (this.countBlock.hasOwnProperty(key)) {
        const blocks = this.countBlock[key];
        blocks.forEach(blockName => {
          if (blockName === type) {
            returnVal = key;
          }
        });
      }
    }
    return returnVal;
  }
  public getCategoryKor(params: string) {
    const key = params.toLowerCase();
    this.translate = {
      logic: '논리',
      math: '연산',
      loop: '반복',
      variables: '변수',
      command: '명령어',
      functions: '함수'
    };
    return this.translate[key];
  }
  public getColour(params: string) {
    const key = params.toLowerCase();
    this.colour = {
      logic: '#2e79ee',
      math: '#2b03d3',
      loop: '#e02157',
      variables: '#3e9b02',
      command: '#cc0000',
      functions: '#123443'
    };
    return this.colour[key];
  }

  /**
   * 툴박스 전체를 만들어줌.
   * 'cate'모드 일 땐, 카테고리 형식으로 만들어줌.
   * 'cate'모드가 아닐 경우 블럭 리스트를 만들어줌.
   * @param toolList external XXXX_level.js를 참조할 것.
   */
  public generatorToolBox(toolList: Array<any>) {
    let returnVal = '';
    if (toolList[0] === 'cate') {
      let cate = '';
      for (let i = 1; i < toolList.length; i++) {
        const list = toolList[i];
        const { name, custom } = getCategoryName(list[0]);
        cate +=
          '<category name="' +
          name +
          '"' +
          custom +
          ' colour="' +
          this.getColour(name) +
          '">' +
          this.generatorBlocks(list.splice(1, list.length)) +
          '</category>';
      }
      returnVal = cate;
    } else {
      returnVal = this.generatorBlocks(toolList);
    }
    return `<xml id="toolbox" style="display: none">` + returnVal + `</xml>`;

    // 펑션
    function getCategoryName(cateName: any) {
      const custom = cateName.split('/');
      return {
        name: custom[0],
        custom: custom[1] ? ' ' + custom[1] : ''
      };
    }
  }

  /**
   * 블럭 하나를 만들어주는 펑션
   * @param blockList ex) delete/posX_1.posY_1
   */

  public isDisable(name) {
    const cate = this.getCategoryByType(name);
    if (this.disable[cate] === true) {
      console.log('디스에이블');
      console.log('DEX: isDisable -> cate', cate);
      console.log('DEX: isDisable -> this.disable', this.disable);
      return ' disabled="true"';
    }
    return '';
  }
  public generatorBlocks(blockList: any[]) {
    let blocks = '';
    blockList.forEach((blockName: string) => {
      const { name, vlaue } = getBlock(blockName);
      blocks += `<block type="` + name + `"` + this.isDisable(name) + `>` + vlaue + `</block>`;
    });

    return blocks;
    function getBlock(blockInfo: string) {
      const info = blockInfo.split('/');
      const name = info[0];
      if (info.length === 1) {
        return {
          name,
          info,
          shadow: ''
        };
      }
      const shadows = info[1].split('.');
      let value = '';
      shadows.forEach(element => {
        const insideInfo = element.split('_');
        value +=
          `<value name="` +
          insideInfo[0] +
          `">
          <block type="math_number">
            <field name="NUM">` +
          insideInfo[1] +
          `</field>
          </block>
        </value>`;
      });
      return {
        name: name,
        vlaue: value
      };
    }
  }
}
