/* Angular modules */
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/** 본문 페이지 컴포넌트 */
@Component({
	selector: 'app-body',
	templateUrl: './body.component.html',
	styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
	/** 바코드 번호 폼 컨트롤 (읽기 전용) */
	public readonly searchId = new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('[0-9]*')]);

	/** 생성자
	 * @param _router 라우터 (읽기 전용)
	 */
	constructor(private readonly _router: Router) {

	}

	/** 검색 버튼을 누를 경우 호출되는 메서드 */
	public onClickSearchButton(): void {
		/* 입력된 바코드 번호를 첨부하여 검색 결과 페이지로 이동 */
		this._router.navigate(['/search-result', this.searchId.value, '0']);
	}

	/** 최근 결과 버튼을 누를 경우 호출되는 메서드 */
	public onClickRecentResultButton(): void {
		/* 최근 결과 페이지로 이동 */
		this._router.navigate(['/recent-result']);
	}

	/** 카메라 버튼을 누를 경우 호출되는 메서드 */
	public onClickCameraButton(): void {
		// 카메라 앱 실행 요청 API 호출...
	}

	/** 갤러리 버튼을 누를 경우 호출되는 메서드 */
	public onClickGalleryButton(): void {
		// 갤러리 앱 실행 요청 API 호출...
	}

	/** 기본 상식 버튼을 누를 경우 호출되는 메서드 */
	public onClickCommonInfoButton(): void {
		/* 기본 상식 페이지로 이동 */
		this._router.navigate(['/common-info']);
	}

	/** 피드백 버튼을 누를 경우 호출되는 메서드 */
	public onClickFeedbackButton(): void {
		// 개발자 이메일 Intent 요청 API 호출...
	}
}
