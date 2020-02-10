import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['../mypage/mypage.component.scss']
})
export class ClassComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //tab 진행 중인 수업 , 종료된 수업
    $(".tab_box li").click(function(){
      $(this).addClass("on").siblings("li").removeClass("on");
      var idxTabBox = $(".tab_box li").index(this)+1;
      $(".tab_content .tab_cont_in"+idxTabBox).show().siblings("div").hide();
    });
    $('.slider').slick({
      accessibility: false,
      arrows: false,
      adaptiveHeight: false,
      infinite: false
    })
    
    
  }

}
