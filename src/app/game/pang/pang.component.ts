import { Component, OnInit, HostListener, ViewChild, NgZone, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PangService } from '../../service/pang.service';
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
  selector: 'app-pang',
  templateUrl: './pang.component.html',
  styleUrls: ['.././game.scss']
})
export class PangComponent implements OnInit {
  // TODO: 나중에 Ondestroy 에 if(메모리 잡아먹는거 다 지우기)
  @ViewChild('aceEditor') aceEditor: any;

  constructor(
    private route: ActivatedRoute,
    public pangService: PangService,
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

  toolBoxDiv: HTMLElement;
  toolboxWidth: number;

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
      this.gameInfo = this.pangService.getLevelInfo(this.level, this.type);
      this.workspaceService.setMaxBlocks(this.gameInfo.blockCount);
      this._map = this.pangService.initValuesGetMap(this.level, this.type);
      this.map = JSON.parse(JSON.stringify(this._map));
      this.pangService.createScreen();
    });

    this.utilService
      .loadExternalScript('./src/assets/third-party/blockly/v1/blockly_compressed.js')
      .then(() => {
        this.utilService
          .loadExternalScriptArray([
            './src/assets/third-party/blockly/v1/blocks_compressed.js',
            './src/assets/third-party/blockly/v1/javascript_compressed.js',
            './src/assets/third-party/blockly/v1/msg/js/en.js'
          ])
          .then(() => {
            this.changeSlider();
            this.initInterFunc();
            this.pangService.initCustomBlocks();
            this.initWorkpsace();
            this.initBlocklyInterface();
            this.initAceEditor();
            this.boardResize();
            this.zone.run(() => {
              this.initMakeBlock();
              this.initToolBox();
            }, 100);
          });
      })
      .catch(err => {});
  }
  initInterFunc() {
    window['_interFunc'].inter_deleteNum = function(pos_x: number, pos_y: number, id: string) {
      console.log('DEX: PangComponent -> initInterFunc -> id', id);
      const x = pos_x - 1;
      const y = pos_y - 1;
      if (this.isOK(x, y)) {
        this.map[x][y]--;
        window['_log'].push(['fail_minus', id, [pos_x, pos_y]]);
        this.reason = '숫자를 마이너스로 만들었어요';
        throw false;
      }
      this.map[x][y]--;
      window['_log'].push(['delete', id, [pos_x, pos_y]]);
    }.bind(this);
  }
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
        startScale: 1.1,
        maxScale: 1.5,
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
  countBlocks(e) {
    if (e.type === 'create' || e.type === 'delete') {
      const blockCount = {
        loop: 0,
        command: 0,
        all: 0
      };
      const allBlocks = window['_Workspace'].getAllBlocks();
      allBlocks.forEach(block => {
        if (!block.isShadow()) {
          blockCount.all += 1;
          const category = this.workspaceService.getCategoryByType(block.type);
          if (category !== 'false') {
            blockCount[category] += 1;
          }
        }
      });
      // const event = this.workspaceService.setUsedBlocks(blockCount);
      this.usedBlockCount = blockCount;
      // if (event === true) {
      //   const toolBox = JSON.parse(JSON.stringify(this.gameInfo.toolBox));
      //   window['_Workspace'].updateToolbox(
      //     this.workspaceService.generatorToolBox(toolBox)
      //   );
      //   this.toolBoxInit();
      // }
    }
  }
  getWorkspaceToCodeWidthId() {
    if (this.isBlockMode === true) {
      return Blockly.JavaScript.workspaceToCode(window['_Workspace']);
    } else {
      return this.textScript;
    }
  }
  getWorkspaceToCode() {
    const codes = Blockly.JavaScript.workspaceToCode(window['_Workspace']);
    return codes.replace(/(,\s*)?'block_id_[^']+'\)/g, ')');
  }
  getWorkspaceToXml() {
    const t = Blockly.Xml.workspaceToDom(window['_Workspace']);
    const tmp = this.utilService.XMLToString(t);
    console.log('DEX: PangComponent -> getWorkspaceToXml -> tmp', tmp);
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
  initToolBox() {
    const labels = document.getElementsByClassName('blocklyTreeLabel');
    for (const key in labels) {
      if (labels.hasOwnProperty(key)) {
        const element = labels[key];
        const value = element.innerHTML;
        const subValue = this.workspaceService.getCategoryKor(value);
        element.innerHTML =
          `<span class='blocklyTitles'>
          <span class='title'>` +
          value +
          `</span>
          <span class='subTitle'>` +
          subValue +
          `</span>
        </span>`;
      }
    }
    // this.toolBoxDiv = document.querySelector('.blocklyToolboxDiv');
    // this.toolboxWidth = this.toolBoxDiv.offsetWidth;
    // this.toolBoxDiv.setAttribute('style', 'left: -' + this.toolboxWidth + 'px');
  }
  initMakeBlock() {
    const toolBoxDiv = document.querySelector('.blocklyToolboxDiv');
    const button = document.createElement('div');
    button.setAttribute('id', 'makeBlock');
    button.textContent = '블록만들기';
    button.addEventListener('click', this.makeToggle.bind(this));

    const arrowBtn = document.createElement('div');
    arrowBtn.setAttribute('id', 'toolBoxArrow');
    arrowBtn.addEventListener('click', this.openToolBox.bind(this));
    const toolBox = window['_Workspace'].toolbox_;
    toolBox.setHide(true);

    toolBoxDiv.appendChild(button);
    toolBoxDiv.appendChild(arrowBtn);
  }
  openToolBox(e) {
    // TODO: 서버에서 검사하고 오픈 허가
    // MAZE BLockly에 추가 할것. toolbox.setHide
    const $arrow = $(e.target);
    const toolBox = window['_Workspace'].toolbox_;
    if (!$arrow.hasClass('active')) {
      $arrow.toggleClass('active');
      toolBox.setHide(false);
      Blockly.svgResize(window['_Workspace']);
      toolBox.position();
      toolBox.refreshSelection();
    }
  }
  makeToggle() {
    this.activeMake = !this.activeMake;
  }
  makeReset() {
    this.jsToblockScript = `erase(1, 1);`;
    this.errorMessage = ``;
  }
  makeBlock() {
    this.jstoblockService
      .convert(this.jsToblockScript)
      .then(result => {
        Blockly.Xml.domToWorkspace(result, window['_Workspace']);
      })
      .catch(err => {
        this.errorMessage = err;
      });
  }

  reset() {
    for (let x = 0; x < window['_pidList'].length; x++) {
      clearTimeout(window['_pidList'][x]);
    }
    this.map = JSON.parse(JSON.stringify(this._map));
    window['_pidList'].length = 0;
    this.NowcodingInterpreter = null;
    this.pangService.resetScreen();
  }

  execute() {
    if (!('Interpreter' in window)) {
      setTimeout(this.execute, 250);
      return;
    }
    this.result = this.resultType.UNSET;
    const codes = this.getWorkspaceToCodeWidthId();
    this.NowcodingInterpreter = new Interpreter(codes, this.nowInterpreter);

    try {
      let ticks = 10000; // 10k ticks runs Pegman for about 8 minutes.
      while (this.NowcodingInterpreter.step()) {
        if (ticks-- === 0) {
          throw Infinity;
        }
      }
      this.result = this.notDone() ? this.resultType.FAILURE : this.resultType.SUCCESS;
    } catch (e) {
      if (e === Infinity) {
        this.result = this.resultType.TIMEOUT;
      } else if (e === false) {
        this.result = this.resultType.ERROR;
      } else {
        this.result = this.resultType.ERROR;
      }
    }
    if (this.result === this.resultType.FAILURE) {
      window['_log'].push(['fail', null]);
    }
    if (this.result === this.resultType.SUCCESS) {
      window['_log'].push(['finish', null]);
    }

    window['_pidList'].push(
      setTimeout(
        function() {
          this._animate();
        }.bind(this),
        100
      )
    );
  }

  notDone() {
    const max = this.gameInfo.blockCount;
    const used = this.usedBlockCount;
    let reason = '';
    let returnVal = false;
    for (const key in max) {
      if (used[key] > max[key]) {
        reason += key + ' 블럭이 초과되었습니다.\n';
        returnVal = true;
      }
    }
    if (this.pangService.notDone(this.map)) {
      reason += '숫자를 0으로 만들지 못했습니다.\n';
      returnVal = true;
    }
    this.reason = reason;
    return returnVal;
  }

  public isOK(X: number, Y: number) {
    const num = this.map[X][Y];
    return num < 1;
  }
  _animate() {
    const action = window['_log'].shift();

    if (!action) {
      window['_BlocklyInterface'].highlight(null);
      return;
    }
    const [key, id, params] = action;
    window['_BlocklyInterface'].highlight(id);
    switch (key) {
      case 'delete':
        this.pangService.ani_deleteNum(params[0], params[1]);
        break;
      case 'fail_minus':
        this.pangService.ani_deleteNum(params[0], params[1]);
        this.modalService.onModal(
          'popup',
          {
            timeout: 750,
            text: this.reason
          },
          {
            backdrop: false,
            ignoreBackdropClick: true
          }
        );
        break;
      case 'fail':
        this.modalService.onModal(
          'popup',
          {
            timeout: 1500,
            text: this.reason
          },
          {
            backdrop: false,
            ignoreBackdropClick: true
          }
        );
        break;
      case 'finish':
        console.log('통과!');
        // 지금 라이브 수업? => 내 수업으로 돌아가기
        // 라이브가 아니면서 숙제가 다음에 있다면 => 다음문제
        // 마지막 문제일때 => 내 수업으로 돌아가기
        this.modalService
          .onModal('classClear', {
            problemStatus: 'LIVE',
            popScript: this.blockScript
          })
          .then(result => {
            if (result) {
              console.log('다음 문제로 가자');
            } else {
              console.log('다시 풀기');
            }
          });
        break;
    }
    window['_pidList'].push(
      setTimeout(
        function() {
          this._animate();
        }.bind(this),
        this.gameSpeed * 3
      )
    );
  }
  nowInterpreter(interpreter: any, scope: any) {
    let wrapper;
    wrapper = function(pos_x: any, pos_y: any, id: any = { data: null }) {
      window['_interFunc'].inter_deleteNum(pos_x.data, pos_y.data, id.data);
    };
    interpreter.setProperty(scope, 'erase', interpreter.createNativeFunction(wrapper));
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

  // Board ----------------------------------------
  resetButton(e) {
    if (window['_BlocklyInterface'].eventSpam(e)) {
      return;
    }
    this.isStartGame = false;
    this.reset();
  }
  runButton(e) {
    if (window['_BlocklyInterface'].eventSpam(e)) {
      return;
    }
    this.isStartGame = true;
    this.reset();
    this.execute();
  }
  startClass(e) {
    if (window['_BlocklyInterface'].eventSpam(e)) {
      return;
    }
    this.modalService.onModal('classStart', { className: '수업1' }).then(result => {
      console.log('DEX: PangComponent -> startClass -> result', result);
      if (result) {
        this.countup(0).subscribe(next => {
          this.countUpTime = next;
        });
        this.isStartClass = true;
        // TODO: 서버에 시작 시간 보내기
        // 서버에 프로블럼 상태 바꾸기
      }
    });
  }

  endClass(e) {
    if (window['_BlocklyInterface'].eventSpam(e)) {
      return;
    }
    this.modalService.onModal('classEnd').then(result => {
      if (result) {
        this.isStartClass = false;
        this.isEndClass = true;
        console.log('DEX: PangComponent -> endClass -> this.countUpTime', this.countUpTime);
        // TODO: 서버에 종료 시간 보내기
        // 서버에 프로블럼 상태 바꾸기
      }
    });
  }

  countup(delay: number = 0) {
    return new Observable<{
      display: string;
      hours: number;
      minutes: number;
      seconds: number;
      finished: boolean;
    }>(subscriber => {
      timer(delay, 1000)
        .pipe(takeWhile(x => this.isStartClass))
        .subscribe(count => {
          // count = seconds
          const h = Math.floor(count / 3600) % 24;
          count -= h * 3600;
          const m = Math.floor(count / 60) % 60;
          count -= m * 60;
          const s = count % 60;

          subscriber.next({
            display: `${('0' + h.toString()).slice(-2)}:${('0' + m.toString()).slice(-2)}:${(
              '0' + s.toString()
            ).slice(-2)}`,
            hours: h,
            minutes: m,
            seconds: s,
            finished: h === 0 && m === 0 && s === 0
          });

          if (s <= 0 && h > 23) {
            subscriber.complete();
          }
        });
    });
  }
}
