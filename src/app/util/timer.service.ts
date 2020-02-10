import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, takeWhile, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  // {
  //   "display": "00:53",
  //   "minutes": 0,
  //   "seconds": 53,
  //   "finished": false
  // }
  // this.countdown(2).subscribe(next => {
  //   document.body.innerHTML = `<pre><code>${JSON.stringify(next, null, 4)}</code></pre>`;
  // });
  public countdown(minutes: number, delay: number = 0) {
    return new Observable<{ display: string; minutes: number; seconds: number, finished: boolean }>(
      subscriber => {
        timer(delay, 1000)
          .pipe(take(minutes * 60))
          .pipe(map(v => minutes * 60 - 1 - v))
          .pipe(takeWhile(x => x >= 0 && !subscriber.closed))
          .subscribe(count => { // countdown => seconds
            const m = Math.floor(count / 60);
            const s = count - m * 60;

            subscriber.next({
              display: `${('0' + m.toString()).slice(-2)}:${('0' + s.toString()).slice(-2)}`,
              minutes: m,
              seconds: s,
              finished: m === 0 && s === 0
            });

            if (s <= 0 && minutes <= 0) {
              subscriber.complete();
            }
          });
      }
    );
  }



}
