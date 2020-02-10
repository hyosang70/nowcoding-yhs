import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-class-clear',
  template: `
    <section class="modal-wrap double">
      <div class="modal-inner">
        <div class="modal-contents">
          <div class="max">
            <div
              ace-editor
              id="scriptEditor"
              #aceEditor
              [(text)]="popScript"
              [mode]="'javascript'"
              [theme]="'monokai'"
              [options]="{ fontSize: 19 }"
              [readOnly]="true"
              style="min-height: 100%; width:100%; overflow: auto;"
            ></div>
          </div>
          <div class="max right">
            <div class="modal-img flex justify-center">
              <img src="/src/assets/img/web/modal-icon-best.png" />
            </div>
            <p class="txt3 pt-10">
              멋지게 문제를 해결했군요!<br />학생을 위한 맞춤형 숙제가
              있어요.<br />집에가서 꼭 풀어보세요!
            </p>
            <!-- <p class="txt3 pt-16">멋지게 문제를 해결했군요!<br>다음 문제에 도전해 볼까요?</p> -->
            <div class="modal-btn flex justify-between">
              <button
                type="button"
                class="text-center bg-gray-btn hover:bg-gray-btn text-white text-lg rounded-full"
                (click)="cancel()"
              >
                다시풀기
              </button>
              <button
                type="button"
                class="text-center bg-blue-main hover:bg-blue-main text-white text-lg rounded-full"
                (click)="confirm()"
              >
                내 수업으로
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ClassClearComponent implements OnInit, OnDestroy {
  public onClose: Subject<any>;
  problemStatus: string;
  popScript: string;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.onClose = new Subject();
    console.log(
      'DEX: ClassClearComponent -> ngOnInit -> this.problemStatus',
      this.problemStatus
    );
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
