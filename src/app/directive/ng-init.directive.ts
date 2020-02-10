import { Directive, OnInit, Output, EventEmitter } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ngInit]'
})
export class NgInitDirective implements OnInit {

  @Output()
  ngInit: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
      this.ngInit.emit();
  }

}
