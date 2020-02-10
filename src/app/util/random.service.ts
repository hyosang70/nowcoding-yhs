import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {
  constructor() {}

  public random(min: number, max: number) {
    return min + Math.random() * (max - min);
  }
}
