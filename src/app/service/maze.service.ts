import { Injectable } from '@angular/core';
import * as maze_level from '../game/external/maze_level.js';

declare var Blockly: any;

@Injectable({
  providedIn: 'root'
})
export class MazeService {
  svgW3 = 'http://www.w3.org/2000/svg';
  xlinkW3 = 'http://www.w3.org/1999/xlink';

  levels = maze_level.getMazeLevels();
  src = '/src/assets/img/game/';

  level: string;
  type: string;

  levelInfo: any;
  map: Array<number>;

  mapRow: number;
  mapCol: number;

  rectSize: number;
  viewPort: number;

  skin: any;
  map_skin: any;
  char_skin: any;
  gaol_skin: any;

  SquareType = {
    WALL: 0,
    OPEN: 1,
    START: 2,
    FINISH: 3,
    DANGER: 4
  };
  DirectionType = {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3
  };
  ResultType = {
    UNSET: 0,
    SUCCESS: 1,
    FAILURE: -1,
    TIMEOUT: 2,
    ERROR: -2
  };
  CHAR_SKINS = {
    basic: this.src + 'maze/character.png'
  };
  GAOL_SKINS = {
    basic: this.src + 'maze/goal.png'
  };
  MAP_SKINS = {
    asphalt: this.src + 'maze/tile_asphalt.png',
    asphalt2: this.src + 'maze/tile_asphalt2.png',
    bridge: this.src + 'maze/tile_bridge.png',
    dark: this.src + 'maze/tile_dark.png',
    dust: this.src + 'maze/tile_dust.png',
    egypt: this.src + 'maze/tile_egypt.png',
    grass: this.src + 'maze/tile_grass.png',
    ice: this.src + 'maze/tile_ice.png',
    lava: this.src + 'maze/tile_lava.png',
    snow: this.src + 'maze/tile_snow.png',
    space: this.src + 'maze/tile_space.png'
  };

  tile_SHAPES = {
    '10010': [4, 0], // Dead ends
    '10001': [3, 3],
    '11000': [0, 1],
    '10100': [0, 2],
    '11010': [4, 1], // Vertical
    '10101': [3, 2], // Horizontal
    '10110': [0, 0], // Elbows
    '10011': [2, 0],
    '11001': [4, 2],
    '11100': [2, 3],
    '11110': [1, 1], // Junctions
    '10111': [1, 0],
    '11011': [2, 1],
    '11101': [1, 2],
    '11111': [2, 2], // Cross
    null0: [4, 3], // Empty
    null1: [3, 0],
    null2: [3, 1],
    null3: [0, 3],
    null4: [1, 3]
  };

  constructor() {}

  public createSvgElement(name: string, attrs: object, parent: any) {
    const e = document.createElementNS(this.svgW3, name);
    for (const key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        const element = attrs[key];
        e.setAttribute(key, element);
      }
    }
    if (parent) {
      parent.appendChild(e);
    }
    return e;
  }

  public getLevelInfo(_level: string, _type: string) {
    return this.levels[_level][_type];
  }

  public initValuesGetMap(_level: string, _type: string) {
    this.level = _level;
    this.type = _type;
    this.levelInfo = this.getLevelInfo(this.level, this.type);
    this.map = this.levelInfo.grid;
    this.mapRow = this.levelInfo.grid.length;
    this.mapCol = this.levelInfo.grid[0].length;
    this.viewPort = 800;
    this.rectSize = this.viewPort / this.mapRow;
    this.skin = this.levelInfo.skin;
    this.map_skin = this.MAP_SKINS[this.skin.map];
    this.char_skin = this.CHAR_SKINS[this.skin.char];
    this.gaol_skin = this.GAOL_SKINS[this.skin.gaol];

    return this.map;
  }

  public generatorElementId(name: string, i: any, j: any) {
    return name + '_' + i + '_' + j;
  }
  public normalize(x, y) {
    if (x < 0 || x >= this.mapCol || y < 0 || y >= this.mapRow) {
      return '0';
    }
    return this.map[y][x] === this.SquareType.WALL ? '0' : '1';
  }

  public createScreen() {
    const SVG = document.getElementById('mazeSVG');

    SVG.setAttribute('x', '0');
    SVG.setAttribute('y', '0');
    SVG.setAttribute('height', '100%');
    SVG.setAttribute('width', '100%');
    SVG.setAttribute('viewbox', '0 0 ' + this.viewPort + ' ' + this.viewPort);
    SVG.setAttribute('overflow', 'visible');

    for (let i = 0; i < this.mapRow; i++) {
      for (let j = 0; j < this.mapCol; j++) {
        const tileShape =
          this.normalize(j, i) +
          this.normalize(j, i - 1) +
          this.normalize(j + 1, i) +
          this.normalize(j, i + 1) +
          this.normalize(j - 1, i);
        if (!this.tile_SHAPES[tileShape]) {
          continue;
        }

        const left = this.tile_SHAPES[tileShape][0];
        const top = this.tile_SHAPES[tileShape][1];

        const tileClip = this.createSvgElement(
          'clipPath',
          {
            id: 'clip_' + j + '_' + i
          },
          SVG
        );
        this.createSvgElement(
          'rect',
          {
            height: this.rectSize,
            width: this.rectSize,
            x: j * this.rectSize,
            y: i * this.rectSize
          },
          tileClip
        );
        const tile = this.createSvgElement(
          'image',
          {
            height: this.rectSize * 4,
            width: this.rectSize * 5,
            'clip-path': 'url(#clip_' + j + '_' + i + ')',
            x: (j - left) * this.rectSize,
            y: (i - top) * this.rectSize
          },
          SVG
        );
        tile.setAttributeNS(this.xlinkW3, 'xlink:href', this.map_skin);
      }
    }

    const characterIcon = this.createSvgElement(
      'image',
      {
        id: 'charIcon',
        height: this.rectSize,
        width: this.rectSize
      },
      SVG
    );
    characterIcon.setAttributeNS(this.xlinkW3, 'xlink:href', this.char_skin);

    const finishIcon = this.createSvgElement(
      'image',
      {
        id: 'finishIcon',
        height: this.rectSize,
        width: this.rectSize
      },
      SVG
    );
    finishIcon.setAttributeNS(this.xlinkW3, 'xlink:href', this.gaol_skin);
  }
}
