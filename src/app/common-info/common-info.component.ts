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
	public readonly commonInfo: string = '분리배출 기본 상식 내용...';

	/** 생성자
	 * @param _router 라우터 (읽기 전용)
	 */
	constructor(private readonly _router: Router) { }

	/** 뒤로 가기 버튼을 누를 경우 호출되는 메서드 */
	public onClickBackButton(): void {
		/* 메인 페이지로 이동 */
		this._router.navigate(['']);
	}

}
