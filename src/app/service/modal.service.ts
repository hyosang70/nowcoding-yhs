import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

import { ClassSearchComponent } from '../modal/class-search/class-search.component';
import { ClassListComponent } from '../modal/class-list/class-list.component';
import { ClsssAllowedComponent } from '../modal/clsss-allowed/clsss-allowed.component';
import { ClsssNoallowedComponent } from '../modal/clsss-noallowed/clsss-noallowed.component';
import { ClassClearComponent } from '../modal/class-clear/class-clear.component';

// 클래스 시작 종료.
import { ClassStartComponent } from '../modal/class-start/class-start.component';
import { ClassEndComponent } from '../modal/class-end/class-end.component';

// 이미지 팝업.
import { PopupComponent } from '../modal/popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  bsModalRef: BsModalRef;
  subscriptions: Subscription[] = [];

  constructor(private bsModalService: BsModalService) {}

  // config={
  //   backdrop: true,
  //   ignoreBackdropClick: false,
  //   animated: true,
  //   class: '',
  //   initialState: '',
  //   keyboard: true,
  //   show: ??
  // }
  public onModal(componentName: string, initialState: any = null, config = {}) {
    return new Promise((resolve, reject) => {
      const modalComponent = this.getComponentByName(componentName);
      this.bsModalRef = this.bsModalService.show(
        modalComponent,
        Object.assign({}, config, { initialState })
      );
      this.subscriptions.push(
        this.bsModalRef.content.onClose.subscribe((result: string) => {
          console.log('DEX: ModalService -> onModal -> result', result);
          resolve(result);
          this.unsubscribe();
        })
      );
    });
  }
  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  // TODO: dynamic component loader개발할 것.
  // path, name를 parameter로 사용하면 좋을 뜻.
  getComponentByName(name: any) {
    switch (name) {
      case 'classEnd':
        return ClassEndComponent;
      case 'classStart':
        return ClassStartComponent;
      case 'classSearch':
        return ClassSearchComponent;
      case 'classList':
        return ClassListComponent;
      case 'clsssAllowed':
        return ClsssAllowedComponent;
      case 'clsssNoallowed':
        return ClsssNoallowedComponent;
      case 'classClear':
        return ClassClearComponent;
      case 'popup':
        return PopupComponent;
      default:
        console.log('찾을 수 없음');
        break;
    }
  }
}
