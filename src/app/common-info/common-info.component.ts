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
  public readonly commonInfos: string[][] = [
    [
      '종이',
      '물기에 젖지 않도록 하고, 반듯하게 펴서 차곡차곡 쌓은 후 흩날리지 않도록 끈 등으로 묶어서 배출한다. 스프링 등 종이류와 다른 재질은 제거한 후 배출한다. 테이프 등 종이류와 다른 재질은 제거한 후 배출한다.',
    ],
    [
      '페트병',
      '내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출한다. 부착상표, 부속품 등 본체와 다른 재질은 제거한 후 배출한다.',
    ],
    [
      '비닐류',
      '내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출한다. 흩날리지 않도록 봉투에 담아 배출한다.',
    ],
    [
      '폐식용유',
      '음식물 등 이물질이 섞이지 않게 모아 폐식용유 전용수거함에 배출한다.',
    ],
    [
      '폐건전지',
      '전지를 제품에서 분리하여 배출한다. 주요거점(동 주민센터·아파트의 폐형광등·폐건전지 일체함 또는 편의점, 아파트 동별 우편함 등)의 전용수거함에 배출한다. 단, 휴대폰배터리는 폐건전지가 아닌 휴대폰과 함께 배출한다.',
    ],
  ];
  /** 생성자
   * @param _router 라우터 (읽기 전용)
   */
  constructor(private readonly _router: Router) {}
}
