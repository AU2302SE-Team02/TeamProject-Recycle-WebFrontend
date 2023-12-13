/* Angular modules */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/** 헤더 컴포넌트 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private readonly _router: Router) {}
  /** 뒤로 가기 버튼을 누를 경우 호출되는 메서드 */
  public onClickBackButton(): void {
    /* 메인 페이지로 이동 */
    let urlSplits = this._router.routerState.snapshot.url.split('/');
    if (urlSplits[1] === 'search-result') {
      if (urlSplits[4] === '1') {
        this._router.navigate(['recent-result', decodeURI(urlSplits[2])]);
      } else {
        this._router.navigate(['']);
      }
    } else {
      this._router.navigate(['']);
    }
  }
}
