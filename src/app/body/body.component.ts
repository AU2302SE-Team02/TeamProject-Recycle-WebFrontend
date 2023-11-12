/* Angular modules */
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/** 앱 본문 컴포넌트 */
@Component({
	selector: 'app-body',
	templateUrl: './body.component.html',
	styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
	public searchId = new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('[0-9]*')]);

	constructor(private readonly _router: Router) {

	}

	public onClickSearchButton(): void {
		this._router.navigate(['/search-result', this.searchId.value]);
	}

	public onClickCommonInfoButton(): void {
		this._router.navigate(['/common-info']);
	}

	public onClickFeedbackButton(): void {
		// 개발자 이메일 Intent 요청 API 호출...
	}
}
