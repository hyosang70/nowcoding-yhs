import { Component, OnInit } from '@angular/core';
import 'slick-carousel';
import * as $ from 'jquery';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.slider').slick({
      accessibility: false,
      arrows: false,
      adaptiveHeight: false,
      infinite: false
    })
  }

}
