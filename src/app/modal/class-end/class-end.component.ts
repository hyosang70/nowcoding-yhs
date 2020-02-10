import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-class-end',
  template: `
  <section class="modal-wrap">
    <div class="modal-inner">
      <div class="modal-contents">
        <div class="min">
          <div class="flex justify-center">
            <img src="/src/assets/img/web/modal-icon-noti.png" />
          </div>
        <p class="txt3 pt-8">수업을 종료하시겠습니까?</p>
        </div>

        <div class="modal-btn flex justify-between">
          <button type="button"
            class="text-center bg-gray-btn hover:bg-gray-btn text-white text-lg rounded-full"
            (click)="cancel()"
          >취소</button>
          <button type="button"
            class="text-center bg-blue-main hover:bg-blue-main text-white text-lg rounded-full"
            (click)="confirm()"
          >수업시작</button>
        </div>
      </div>
    </div>
  </section>
  `,
  styles: []
})
export class ClassEndComponent implements OnInit, OnDestroy {
  public onClose: Subject<any>;

  constructor(
    public bsModalRef: BsModalRef
  ) { }
  ngOnInit() {
    this.onClose = new Subject();
  }
  confirm() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }
  cancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
  ngOnDestroy() {
    this.onClose.next(false);
  }
}

