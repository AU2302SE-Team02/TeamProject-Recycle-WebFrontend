/* Angular modules */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/* Dependent modules */
import { ItemInfoTable } from '../common/common';

/** 최근 검색 결과 페이지 컴포넌트 */
@Component({
	selector: 'app-recent-result',
	templateUrl: './recent-result.component.html',
	styleUrls: ['./recent-result.component.scss'],
})
export class RecentResultComponent {
	public readonly recentResultList: ItemInfoTable[] = [];

	/** 생성자
	 * @param _router 라우터 (읽기 전용)
	 */
	constructor(private readonly _router: Router) { }

	/** 초기화 훅 메서드 */
	public ngOnInit(): void {
		fetch('assets/test-recent-result.json').then((response) => {
			if (response.ok) { return response.json(); }
			else { throw new Error('서버 응답이 올바르지 않습니다.'); }
		}).then((json) => {
			/* JSON 데이터를 이용해 정보 저장 */
			json.items.forEach((item: any) => {
				this.recentResultList.push(new ItemInfoTable(item));
			});
		});
	}

	/** 다시 검색 버튼을 누를 경우 호출되는 메서드 */
	public onClickSearchAgainButton(itemId: string): void {
		/* 검색 결과 페이지로 이동 */
		this._router.navigate(['/search-result', itemId, '1']);
	}

	/** 뒤로 가기 버튼을 누를 경우 호출되는 메서드 */
	public onClickBackButton(): void {
		/* 메인 페이지로 이동 */
		this._router.navigate(['']);
	}
}
