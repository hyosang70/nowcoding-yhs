import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-popup',
  template: `
    <section class="modal-wrap">
      <div class="modal-inner">
        <div class="modal-contents">
          <img src="/src/assets/img/web/modal-icon-noti.png" />
          <pre>{{ text }}</pre>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class PopupComponent implements OnInit, OnDestroy {
  public onClose: Subject<any>;
  timeout: number;
  text: string;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.onClose = new Subject();
    console.log('this : ', this.timeout);
    if (this.timeout !== null) {
      setTimeout(
        function() {
          this.ngOnDestroy();
        }.bind(this),
        this.timeout
      );
    }
  }
  ngOnDestroy() {
    this.bsModalRef.hide();
    this.onClose.next(false);
  }
}
