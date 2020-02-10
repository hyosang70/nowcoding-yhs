import { Injectable } from '@angular/core';
import * as pang_level from '../game/external/pang_level.js';

declare var Blockly: any;

@Injectable({
  providedIn: 'root'
})
export class PangService {
  xmlns = 'http://www.w3.org/2000/svg';
  levels = pang_level.getPangLevels();

  level: string;
  type: string;

  levelInfo: any;
  map: Array<number>;

  mapRow: number;
  mapCol: number;

  rectSize: number;
  viewPort: number;

  skin: {
    num: string;
    zero: string;
    minus: string;
  };
  constructor() {}

  public initCustomBlocks() {
    Blockly.Blocks['erase'] = {
      init: function() {
        this.appendDummyInput().appendField('erase');
        this.appendValueInput('posX')
          .setCheck('Number')
          .appendField('x');
        this.appendValueInput('posY')
          .setCheck('Number')
          .appendField('y');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour(0);
        this.setTooltip('Erase');
        this.setHelpUrl('');
      }
    };
    Blockly.JavaScript['erase'] = function(block) {
      const posx = Blockly.JavaScript.valueToCode(block, 'posX', Blockly.JavaScript.ORDER_ATOMIC);
      const posy = Blockly.JavaScript.valueToCode(block, 'posY', Blockly.JavaScript.ORDER_ATOMIC);
      const code = 'erase(' + posx + ', ' + posy + ", 'block_id_" + block.id + "');\n";
      return code;
    };
  }
  public getLevelInfo(_level: string, _type: string) {
    return this.levels[_level][_type];
  }
  public initValuesGetMap(_level: string, _type: string) {
    // {level: "001", type: "HC"}
    this.level = _level;
    this.type = _type;
    this.levelInfo = this.getLevelInfo(this.level, this.type);
    this.map = this.levelInfo.grid;
    this.mapRow = this.levelInfo.grid.length;
    this.mapCol = this.levelInfo.grid[0].length;
    this.viewPort = 800;
    this.rectSize = this.viewPort / this.mapRow;
    this.skin = this.levelInfo.skin;
    return this.map;
  }
  public generatorElementId(name: string, i: any, j: any) {
    return name + '_' + i + '_' + j;
  }
  public createScreen() {
    const SVG = document.getElementById('pangSVG');

    SVG.setAttribute('x', '0');
    SVG.setAttribute('y', '0');
    SVG.setAttribute('height', '100%');
    SVG.setAttribute('width', '100%');
    SVG.setAttribute('viewbox', '0 0 ' + this.viewPort + ' ' + this.viewPort);
    SVG.setAttribute('overflow', 'visible');

    const rect_g = document.createElementNS(this.xmlns, 'g');
    rect_g.setAttribute('id', 'rect_g');

    const index_g = document.createElementNS(this.xmlns, 'g');
    index_g.setAttribute('id', 'index_g');

    for (let i = 0; i < this.mapRow; i++) {
      for (let j = 0; j < this.mapCol; j++) {
        const num = this.map[i][j];
        const x = this.rectSize * j;
        const y = this.rectSize * i;
        const center = this.rectSize / 2;

        const tile_g = document.createElementNS(this.xmlns, 'g');
        tile_g.setAttribute('id', this.generatorElementId('tile_g', i + 1, j + 1));

        const rect = document.createElementNS(this.xmlns, 'rect');
        rect.setAttribute('id', this.generatorElementId('rect', i + 1, j + 1));
        rect.setAttribute('height', this.rectSize - 6 + 'px');
        rect.setAttribute('width', this.rectSize - 6 + 'px');
        rect.setAttribute('x', x + 3 + 'px');
        rect.setAttribute('y', y + 3 + 'px');
        rect.setAttribute('rx', 12 + '');
        rect.setAttribute('ry', 12 + '');

        const text = document.createElementNS(this.xmlns, 'text');
        if (num > 0) {
          text.setAttribute('id', this.generatorElementId('text', i + 1, j + 1));
          text.setAttribute('x', x + center + 'px');
          text.setAttribute('y', y + this.rectSize / 1.5 + 'px');
          text.setAttribute('fill', '#ffffff');
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('style', 'font-size:' + center + 'px');
          text.textContent = num;
          rect.setAttribute('fill', this.skin.num);
        } else {
          rect.setAttribute('fill', this.skin.zero);
        }
        tile_g.appendChild(rect);
        tile_g.appendChild(text);
        rect_g.appendChild(tile_g);

        if (i === 0 && j === 0) {
          const indexText = document.createElementNS(this.xmlns, 'text');
          indexText.textContent = String(j + 1);
          indexText.setAttribute('id', 'index_' + i + '_' + j);
          indexText.setAttribute('x', x + center + 'px');
          indexText.setAttribute('y', y - center / 2.5 + 'px');
          indexText.setAttribute('fill', '#ffffff');
          indexText.setAttribute('text-anchor', 'middle');
          indexText.setAttribute('style', 'font-size:' + center + 'px');
          index_g.appendChild(indexText);
          const indexText2 = document.createElementNS(this.xmlns, 'text');
          indexText2.textContent = String(i + 1);
          indexText2.setAttribute('id', 'index_' + i + '_' + j);
          indexText2.setAttribute('x', x - center / 1.5 + 'px');
          indexText2.setAttribute('y', y + this.rectSize / 1.5 + 'px');
          indexText2.setAttribute('fill', '#ffffff');
          indexText2.setAttribute('text-anchor', 'middle');
          indexText2.setAttribute('style', 'font-size:' + center + 'px');
          index_g.appendChild(indexText2);
        } else if (i === 0) {
          const indexText = document.createElementNS(this.xmlns, 'text');
          indexText.textContent = String(j + 1);
          indexText.setAttribute('id', 'index_' + i + '_' + j);
          indexText.setAttribute('x', x + center + 'px');
          indexText.setAttribute('y', y - center / 2.5 + 'px');
          indexText.setAttribute('fill', '#ffffff');
          indexText.setAttribute('text-anchor', 'middle');
          indexText.setAttribute('style', 'font-size:' + center + 'px');
          index_g.appendChild(indexText);
        } else if (j === 0) {
          const indexText = document.createElementNS(this.xmlns, 'text');
          indexText.textContent = String(i + 1);
          indexText.setAttribute('id', 'index_' + i + '_' + j);
          indexText.setAttribute('x', x - center / 1.5 + 'px');
          indexText.setAttribute('y', y + this.rectSize / 1.5 + 'px');
          indexText.setAttribute('fill', '#ffffff');
          indexText.setAttribute('text-anchor', 'middle');
          indexText.setAttribute('style', 'font-size:' + center + 'px');
          index_g.appendChild(indexText);
        }
      }
    }
    SVG.appendChild(rect_g);
    SVG.appendChild(index_g);
  }

  public resetScreen() {
    for (let i = 0; i < this.mapRow; i++) {
      for (let j = 0; j < this.mapCol; j++) {
        const num = this.map[i][j];
        const text = document.getElementById(this.generatorElementId('text', i + 1, j + 1));
        const rect = document.getElementById(this.generatorElementId('rect', i + 1, j + 1));
        if (num > 0) {
          text.textContent = num;
          rect.setAttribute('fill', this.skin.num);
        } else {
          rect.setAttribute('fill', this.skin.zero);
          if (text !== null) {
            text.textContent = '';
          }
        }
      }
    }
  }

  public ani_deleteNum(X: number, Y: number) {
    if (X > this.mapRow || Y > this.mapCol) {
      return;
    }
    const text = document.getElementById('text_' + X + '_' + Y);
    const rect = document.getElementById('rect_' + X + '_' + Y);
    const center = this.rectSize / 2;
    if (text === null) {
      const newTextNode = document.createElementNS(this.xmlns, 'text');
      const tile_g = document.getElementById('tile_g_' + X + '_' + Y);
      newTextNode.setAttribute('id', 'text_' + X + '_' + Y);
      newTextNode.setAttribute('x', this.rectSize * (Y - 1) + center + 'px');
      newTextNode.setAttribute('y', this.rectSize * (X - 1) + this.rectSize / 1.5 + 'px');
      newTextNode.setAttribute('fill', '#ffffff');
      newTextNode.setAttribute('text-anchor', 'middle');
      newTextNode.setAttribute('style', 'font-size:' + center + 'px');
      newTextNode.textContent = '-1';
      rect.setAttribute('fill', this.skin.minus);
      tile_g.appendChild(newTextNode);
    } else {
      const num = Number(text.textContent) - 1;
      if (num === 0) {
        rect.setAttribute('fill', this.skin.zero);
      } else if (num < 0) {
        rect.setAttribute('fill', this.skin.minus);
      }
      text.textContent = String(num);
    }
  }
  public notDone(_map) {
    for (let i = 0; i < this.mapRow; i++) {
      for (let j = 0; j < this.mapCol; j++) {
        const num = _map[i][j];
        if (Number(num) !== 0) {
          return true;
        }
      }
    }
    return false; // 클리어
  }
}
