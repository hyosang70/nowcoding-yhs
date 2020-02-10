import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import 'slick-carousel';
@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {

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
    });
    // 로그인 후 수업 리스트 페이지 상단 프로필 영역 프로그래스 바
    $('.bar1').css('width', '87.5%');
    $('.bar2').css('width', '50%');

    $('#left-navi li.first').click(function(){
      $('#left-navi .navi-bar').css('top','197px');
    });
    $('#left-navi li.second').click(function(){
      $('#left-navi .navi-bar').css('top','260px');
    });
  }
  

}
