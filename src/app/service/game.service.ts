import { Injectable } from '@angular/core';

import { MazeService } from './maze.service';
import { PangService } from './pang.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    public mazeService: MazeService,
    public pangService: PangService,
  ) { }
  
  /**
   * 게임 이름을 알수있게 함.
   * @param url url을 가져와서 maze, pang인지 알아냄.
   * ex) http://localhost:4200/game/pang/1/1
   */
  public getGameName(url: string) {
    const tmp = url.split('/');
    if (/^[a-z]+$/.test(tmp[2])) {
      return tmp[2];
    }
  }

  /**
   * external에 level.js를 잠고하여 특정 레벨에 게임인포를 리턴함.
   * @param _key 게임 이름.
   * @param param1 스탭과 레벨인포를 통해 가져옴.
   */
  public getGameInfo(_key: string, { step: step, level: level }) {
    switch (_key) {
      case 'pang':
        return this.pangService.getLevelInfo(step, level);
      case 'maze':
        return this.mazeService.getLevelInfo(step, level);
    }
  }

  /**
   * 게임에 따라서 어떤 버전의 blokcly를 가져올지
   * @param gameName 게임이름.
   */
  public getVersion(gameName: string) {
    if (gameName === 'maze') {
      return 'v2';
    } else {
      return 'v1';
    }
  }



}
