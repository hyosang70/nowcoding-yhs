import { Component, AfterViewInit , ViewChild, ElementRef } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
// import * as $ from 'jquery';
// import 'slick-carousel';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  // carouselItems: string[] = ['1', '2', '3'];
  // @ViewChild('carousel') carousel: ElementRef;

  constructor() {
    console.log("<- now coding front-end ->");
    setTheme('bs4');
  }
  
  ngAfterViewInit() {
    // $(this.carousel.nativeElement).slick({
    //   dots: true,
    //   infinite: true,
    //   speed: 300,
    //   slidesToShow: 1,
    //   adaptiveHeight: true
    // });
  }
}
