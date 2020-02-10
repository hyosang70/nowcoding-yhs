import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  // element: HTMLElement;

  // html event
  showStudent: boolean;

  // temp
  background = '/src/assets/img/game/game_back.jpg';

  constructor() {}

  ngOnInit() {
    this.showStudent = false;
    $('body').addClass('board');
  }
  showStudentList() {
    this.showStudent = !this.showStudent;
  }

  ngOnDestroy() {
    $('body').removeClass('board');
  }
}
