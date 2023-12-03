/* Angular modules */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/** 기본 상식 페이지 컴포넌트 */
@Component({
  selector: 'app-common-info',
  templateUrl: './common-info.component.html',
  styleUrls: ['./common-info.component.scss'],
})
export class CommonInfoComponent {
  public readonly commonInfos: string[] = [
    '내용물을 비운다 내용물은 비워서 배출해주세요. 깨끗이 씻는다 이물질을 깨끗이 씻은 후 배출해주세요. 상표와 라벨을 분리한다 상표와 라벨은 분리하여 배출해주세요. 재질별로 수거함에 넣는다 재질별로 알맞게 분리하여 배출해주세요.',
    '내용물을 비운다 내용물은 비워서 배출해주세요. 깨끗이 씻는다 이물질을 깨끗이 씻은 후 배출해주세요. 상표와 라벨을 분리한다 상표와 라벨은 분리하여 배출해주세요. 재질별로 수거함에 넣는다 재질별로 알맞게 분리하여 배출해주세요.',
    '내용물을 비운다 내용물은 비워서 배출해주세요. 깨끗이 씻는다 이물질을 깨끗이 씻은 후 배출해주세요. 상표와 라벨을 분리한다 상표와 라벨은 분리하여 배출해주세요. 재질별로 수거함에 넣는다 재질별로 알맞게 분리하여 배출해주세요.',
    '내용물을 비운다 내용물은 비워서 배출해주세요. 깨끗이 씻는다 이물질을 깨끗이 씻은 후 배출해주세요. 상표와 라벨을 분리한다 상표와 라벨은 분리하여 배출해주세요. 재질별로 수거함에 넣는다 재질별로 알맞게 분리하여 배출해주세요.',
  ];
  /** 생성자
   * @param _router 라우터 (읽기 전용)
   */
  constructor(private readonly _router: Router) {}
}
