/* Angular modules */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* Dependent modules */
import { ItemInfoTable } from '../common/common';

/** 검색 결과 페이지 컴포넌트 */
@Component({
	selector: 'app-search-result',
	templateUrl: './search-result.component.html',
	styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
	/** 검색한 바코드 번호 (읽기 전용) */
	public readonly searchId: string = '';
	/** 최근 검색 페이지로부터 왔는지 여부 (읽기 전용) */
	public readonly isFromRecentResult: boolean = false;
	/** 검색 결과 물건 정보 테이블 */
	public itemInfoTable: ItemInfoTable = undefined as unknown as ItemInfoTable;

	/** 생성자
	 * @param _router 라우터 (읽기 전용)
	 * @param _route 라우터 매개변수 모음집 (읽기 전용)
	 */
	constructor(
		private readonly _router: Router,
		private readonly _route: ActivatedRoute) {

		/* 라우터 매개변수 가져오기 */
		this.searchId = this._route.snapshot.paramMap.get('searchId')!;
		this.isFromRecentResult = this._route.snapshot.paramMap.get('isFromRecentResult') === '1';
	}

	/** 초기화 훅 메서드 */
	public ngOnInit(): void {
		/* 검색 요청 API 호출 */
		fetch('assets/test-result.json').then((response) => {
			if (response.ok) { return response.json(); }
			else { throw new Error('서버 응답이 올바르지 않습니다.'); }
		}).then((json) => {
			/* JSON 데이터를 이용해 정보 저장 */
			this.itemInfoTable = new ItemInfoTable(json);
		});
	}

	/** 뒤로 가기 버튼을 누를 경우 호출되는 메서드 */
	public onClickBackButton(): void {
		/* 최근 검색 페이지로부터 왔다면 최근 검색 페이지로 돌아가고, 아닐 경우 메인 페이지로 이동 */
		this._router.navigate([(this.isFromRecentResult ? '/recent-result' : '')]);
	}

}
