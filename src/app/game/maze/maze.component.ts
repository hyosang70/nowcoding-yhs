import { Component, OnInit, HostListener, ViewChild, NgZone, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MazeService } from '../../service/maze.service';
import { UtilService } from '../../service/util.service';

import { Observable, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { ModalService } from '../../service/modal.service';
import { WorkspaceService } from '../../service/workspace.service';
import { JstoblockService } from '../../service/jstoblock.service';

import { ToastrService } from 'ngx-toastr';

import Interpreter from 'js-interpreter';
import * as acorn from 'acorn';

import * as $ from 'jquery';
import { keyframes } from '@angular/animations';

declare var Blockly: any;

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['.././game.scss']
})
export class MazeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public mazeService: MazeService,
    public utilService: UtilService,
    public workspaceService: WorkspaceService,
    public modalService: ModalService,
    public jstoblockService: JstoblockService,
    private zone: NgZone,
    private toastr: ToastrService,
    private elRef: ElementRef
  ) {
    // 글로벌 변수 선언
    window['_log'] = new Array();
    window['_interFunc'] = new Object();
    window['_BlocklyInterface'] = new Object();
    window['_pidList'] = new Array();
    window['_Workspace'] = new Object();
  }
  objectKeys = Object.keys;
  testString: any;

  toolBox: any;
  countUpTime: any;
  isEndClass: boolean;

  element: HTMLElement;
  gameInfo: any;
  usedBlockCount: any;

  Ab_speed: number;
  gameSpeed: number;
  sliderValue: {
    min: any;
    max: any;
    value: any;
  };
  isStartGame: boolean;
  isStartClass: boolean;

  NowcodingInterpreter: any;
  map: Array<any>;
  _map: Array<any>;
  level: string;
  type: string;
  Event: any;

  result: any;
  resultType = {
    UNSET: 0,
    SUCCESS: 1,
    FAILURE: -1,
    TIMEOUT: 2,
    ERROR: -2
  };
  reason: string;

  // ACE 관련 변수들.
  activeMake: boolean;
  isBlockMode: boolean;
  blockScript: string;
  textScript: string;
  jsToblockScript: string;
  errorMessage: string;
  mode: string;
  theme: string;
  options: any;

  ngOnInit() {
    this.isBlockMode = true;
    this.activeMake = false;
    this.usedBlockCount = {
      loop: 0,
      command: 0,
      all: 0
    };
    this.countUpTime = {
      display: '00:00:00',
      hours: 0,
      minutes: 0,
      seconds: 0,
      finished: true
    };
    this.isStartGame = false;
    this.isStartClass = false;
    this.Ab_speed = 200;
    this.sliderValue = {
      min: 1,
      max: 80,
      value: 40
    };
    this.gameSpeed = this.Ab_speed;
    this.route.params.subscribe(params => {
      this.level = params.level;
      this.type = params.type;
      this.gameInfo = this.mazeService.getLevelInfo(this.level, this.type);
      this.workspaceService.setMaxBlocks(this.gameInfo.blockCount);
      this._map = this.mazeService.initValuesGetMap(this.level, this.type);
      this.map = JSON.parse(JSON.stringify(this._map));

      this.mazeService.createScreen();
    });

    this.utilService
      .loadExternalScript('./src/assets/third-party/blockly/v2/blockly_compressed.js')
      .then(() => {
        this.utilService
          .loadExternalScriptArray([
            './src/assets/third-party/blockly/v2/blocks_compressed.js',
            './src/assets/third-party/blockly/v2/javascript_compressed.js',
            './src/assets/third-party/blockly/v2/msg/js/en.js'
          ])
          .then(() => {
            this.changeSlider();
            this.initInterFunc();
            // this.mazeService.initCustomBlocks();
            this.initWorkpsace();
            this.initBlocklyInterface();
            this.initAceEditor();
            this.boardResize();
            this.zone.run(() => {
              this.initMakeBlock();
              // this.initToolBox();
            });
          });
      })
      .catch(err => {});
  }

  // blockly workspace injection
  initWorkpsace() {
    const toolBox = JSON.parse(JSON.stringify(this.gameInfo.toolBox));
    window['_Workspace'] = Blockly.inject('blocklyDiv', {
      grid: {
        spacing: 25,
        length: 3,
        colour: '#ccc',
        snap: true
      },
      toolbox: this.workspaceService.generatorToolBox(toolBox),
      zoom: {
        controls: true,
        wheel: false,
        startScale: 1,
        maxScale: 1.4,
        minScale: 0.8
      },
      disable: true,
      scrollbars: true,
      trashcan: true,
      maxBlocks: Infinity,
      media: './src/assets/media/'
    });
    window['_Workspace'].addChangeListener(e => {
      this.countBlocks(e);
      this.blockScript = this.getWorkspaceToCode();
    });
  }

  getWorkspaceToCode() {
    const codes = Blockly.JavaScript.workspaceToCode(window['_Workspace']);
    return codes;
    // return codes.replace(/(,\s*)?'block_id_[^']+'\)/g, ')');
  }
  initBlocklyInterface() {
    window['_BlocklyInterface'].eventSpam = function(e) {
      const touchMouseTime = 2000;
      if (
        e.type === 'click' &&
        window['_BlocklyInterface'].eventSpam.previousType_ === 'touchend' &&
        window['_BlocklyInterface'].eventSpam.previousDate_ + touchMouseTime > Date.now()
      ) {
        e.preventDefault();
        e.stopPropagation();
        return true;
      }
      const doubleClickTime = 400;
      if (
        window['_BlocklyInterface'].eventSpam.previousType_ === e.type &&
        window['_BlocklyInterface'].eventSpam.previousDate_ + doubleClickTime > Date.now()
      ) {
        e.preventDefault();
        e.stopPropagation();
        return true;
      }
      window['_BlocklyInterface'].eventSpam.previousType_ = e.type;
      window['_BlocklyInterface'].eventSpam.previousDate_ = Date.now();
      return false;
    };
    window['_BlocklyInterface'].eventSpam.previousType_ = null;
    window['_BlocklyInterface'].eventSpam.previousDate_ = 0;
    window['_BlocklyInterface'].highlight = function(id) {
      if (id) {
        const m = id.match(/^block_id_([^']+)$/);
        if (m) {
          id = m[1];
        }
      }
      window['_Workspace'].highlightBlock(id);
    };
  }
  countBlocks(e) {
    if (e.type === 'create' || e.type === 'delete') {
      const blockCount = {
        loop: 0,
        command: 0,
        all: 0
      };
      const allBlocks = window['_Workspace'].getAllBlocks();
      allBlocks.forEach(block => {
        if (block.type !== 'math_number') {
          blockCount.all += 1;
          const category = this.workspaceService.getCategoryByType(block.type);
          if (category !== 'false') {
            blockCount[category] += 1;
          }
        }
      });
      this.usedBlockCount = blockCount;
    }
  }

  // 인터프리터 함수들
  initInterFunc() {
    window['_interFunc'].inter_deleteNum = function(pos_x: number, pos_y: number, id: string) {
      // console.log('DEX: PangComponent -> initInterFunc -> id', id);
      // const x = pos_x - 1;
      // const y = pos_y - 1;
      // if (this.isOK(x, y)) {
      //   this.map[x][y]--;
      //   window['_log'].push(['fail_minus', id, [pos_x, pos_y]]);
      //   this.reason = '숫자를 마이너스로 만들었어요';
      //   throw false;
      // }
      // this.map[x][y]--;
      // window['_log'].push(['delete', id, [pos_x, pos_y]]);
    }.bind(this);
  }
  reset() {}
  makeToggle() {
    this.activeMake = !this.activeMake;
  }
  initMakeBlock() {
    const svgW3 = 'http://www.w3.org/2000/svg';
    const SVG = document.createElementNS(svgW3, 'svg');

    const toolBoxDiv = document.querySelector('.blocklyFlyout') as HTMLInputElement; //svgTag
    let width = toolBoxDiv.getAttribute('width');
    console.log('DEX: MazeComponent -> initMakeBlock -> width', width);
    let hight = toolBoxDiv.offsetHeight;
    console.log('DEX: MazeComponent -> initMakeBlock -> hight', hight);
    // #svgMakeBlock{
    //   width: 100%;
    //   height: 70px;
    //   fill: #2191db;
    //   y: calc(100% - 70px);
    // }

    const button = document.createElementNS(svgW3, 'rect');
    button.addEventListener('click', this.makeToggle.bind(this));
    button.setAttribute('id', 'svgMakeBlock');
    button.setAttribute('width', width + 'px');
    button.setAttribute('hight', '70px');
    button.setAttribute('fill', '#2191db');
    button.setAttribute('y', Number(hight - 70) + 'px');

    const text = document.createElementNS(svgW3, 'text');
    text.textContent = '블록만들기';
    // text.setAttribute('x');

    const arrowBtn = document.createElementNS(svgW3, 'rect');
    arrowBtn.setAttribute('id', 'toolBoxArrow');
    arrowBtn.addEventListener('click', this.openToolBox.bind(this));

    const toolBox = window['_Workspace'].getFlyout_();

    toolBox.setVisible(true);

    toolBoxDiv.appendChild(button);
    toolBoxDiv.appendChild(text);
    toolBoxDiv.appendChild(arrowBtn);
  }
  openToolBox(e) {
    // TODO: 서버에서 검사하고 오픈 허가
    // MAZE BLockly에 추가 할것. toolbox.setHide
    const $arrow = $(e.target);

    // const toolBox = window['_Workspace'].toolbox_;
    // if (!$arrow.hasClass('active')) {
    //   $arrow.toggleClass('active');
    //   toolBox.setHide(false);
    //   Blockly.svgResize(window['_Workspace']);
    //   toolBox.position();
    //   toolBox.refreshSelection();
    // }
  }

  // ====================================================== //
  // ======================   EVENT   ====================== //
  // ====================================================== //

  @HostListener('window:resize', ['$event'])
  boardResize() {
    setHeight('visualBox');
    function setHeight(id: string) {
      const element = document.getElementById(id);
      element.style.height = element.offsetWidth + 'px';
    }
  }
  // UTIL
  changeSlider() {
    const value = this.sliderValue.value;
    const percent = (value / this.sliderValue.max) * 100;
    $('input#speed').css(
      'background',
      'linear-gradient(to right, dodgerblue 0%, dodgerblue ' +
        percent +
        '%, #d5d4d3 ' +
        percent +
        '%, #d5d4d3 100%)'
    );
    const speed = 100 - value;
    this.gameSpeed = this.Ab_speed * speed * 0.01;
  }

  // ====================================================== //
  // ===================   Ace Editor   =================== //
  // ====================================================== //
  initAceEditor() {
    this.mode = 'javascript';
    this.theme = 'monokai';
    this.blockScript = '';
    this.textScript = '';
    this.jsToblockScript = '';
    this.options = {
      fontSize: 19,
      printMargin: false
    };
    this.errorMessage = '';
  }
  aceEditChange(code: any) {
    console.log('DEX: PangComponent -> aceEditChange -> code', code);
  }
  toggleEditor(mode: boolean) {
    this.isBlockMode = mode;
    this.reset();
  }
}
