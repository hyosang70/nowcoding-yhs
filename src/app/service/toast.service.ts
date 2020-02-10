import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastr: ToastrService
  ) { }

  public error() {
    this.toastr.error('everything is broken', 'Major Error', {
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      progressBar: true
    });
  }
}
