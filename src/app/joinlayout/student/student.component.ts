import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'slick-carousel';
import * as $ from 'jquery';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['../joinlayout.component.scss'],
})
export class StudentComponent implements OnInit {
  thisStep: string;
  // id: undefined
  // password: undefined
  // birthday: undefined
  // gender: undefined
  // phone: undefined
  // name: undefined
  // school: undefined
  // email: undefined
  // teacher: undefined

  // model = new Student();


  registerForm: FormGroup;
  submitted = false;


  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.step === undefined) {
        this.thisStep = params.step;
      } else {
        this.thisStep = '0';
      }
    });

    $('.slider').slick({
      accessibility: false,
      arrows: false,
      adaptiveHeight: false,
      infinite: false,
      // draggable:false
    })
    $('.modal-close').click(function(){
      $(this).parents('.modal-wrap').stop().hide()
    });
  }
}
