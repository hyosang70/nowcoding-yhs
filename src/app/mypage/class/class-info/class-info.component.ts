import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import 'slick-carousel';
import { createElement } from '@angular/core/src/view/element';

@Component({
  selector: 'app-class-info',
  templateUrl: './class-info.component.html',
  styleUrls: ['../../mypage/mypage.component.scss']
})

// declare var $: any;
export class ClassInfoComponent implements OnInit {
  constructor() {}
  stringVal: string;
  slicksClass: any;

  test() {
    // console.log('DEX: ClassInfoComponent -> ngOnInit -> this', this);
    $('.un-slick').toggleClass('un');
    if ($('.un-slick').hasClass('un')) {
      this.slicksClass.slick('unslick');
    } else {
      $('.class-slider').slick({
        dots: true,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,

        responsive: [
          {
            breakpoint: 1680,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: false,
              arrows: false
            }
          },
          {
            breakpoint: 1480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: false,
              arrows: false
            }
          },
          {
            breakpoint: 1080,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: false,
              arrows: false
            }
          }
        ]
      });
    }
  }

  ngOnInit() {
    this.slicksClass = $('.class-slider').slick({
      dots: true,
      infinite: false,
      speed: 300,
      arrows: false,
      slidesToShow: 5,
      slidesToScroll: 5,

      responsive: [
        {
          breakpoint: 1680,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: false,
            infinite: false
          }
        },
        {
          breakpoint: 1480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
            infinite: false
          }
        },
        {
          breakpoint: 1080,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false,
            infinite: false
          }
        }
      ]
    });
  }

  textWidthFunc() {
    const body = document.querySelector('body');
    const target = document.getElementById('dynamic_input') as HTMLInputElement;
    const span = document.createElement('span');
    span.setAttribute('id', 'fakeTextWidth');
    body.appendChild(span);
    span.innerHTML = target.value;
    if (target.value === '') {
      span.innerHTML = target.placeholder;
    }
    span.style.fontSize = '20.5px';
    target.style.width = span.offsetWidth + 'px';
    span.style.display = 'none';
    span.remove();
  }
}
