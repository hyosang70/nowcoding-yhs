import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['../joinlayout.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(
        ':enter', 
        [
          style({ opacity: 0 }),
          animate('0.18s ease-out',  style({ opacity: 1 }))
        ]
      ),
      transition(
        ':leave', 
        [
          style({ opacity: 1 }),
          animate('0.08s ease-in', style({ opacity: 0 }))
        ]
      )
    ]),
  ]
})
export class JoinComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
