import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface ItemInfoTable {
	itemId: string;
	itemDocuId: string;
	itemName: string;
	itemDateCreated: string;
	itemDateModified: string;
	itemImageLink: string;
	itemParts: {
		[key: string]: string;
	}[];
}

@Component({
	selector: 'app-search-result',
	templateUrl: './search-result.component.html',
	styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
	public searchId: string = '';
	public itemInfoTable: ItemInfoTable = { itemId: '', itemDocuId: '', itemName: '', itemDateCreated: '', itemDateModified: '', itemImageLink: '', itemParts: [] };

	constructor(
		private readonly _router: Router,
		private readonly _route: ActivatedRoute) {

		/* 라우터 매개변수 가져오기 */
		this.searchId = this._route.snapshot.paramMap.get('searchId')!;
	}

	public ngOnInit(): void {
		fetch('assets/test-result.json').then((response) => {
			if (response.ok) { return response.json(); }
			else { throw new Error('서버 응답이 올바르지 않습니다.'); }
		}).then((json) => {
			console.log(json);
			this.itemInfoTable.itemId = json.itemId;
			this.itemInfoTable.itemDocuId = json.itemDocuId;
			this.itemInfoTable.itemName = json.itemName;
			this.itemInfoTable.itemDateCreated = json.itemDateCreated;
			this.itemInfoTable.itemDateModified = json.itemDateModified;
			this.itemInfoTable.itemImageLink = json.itemImageLink;
			this.itemInfoTable.itemParts = { ...json.itemParts };
			console.log(this.itemInfoTable);
		});
	}

	public onClickBackButton(): void {
		this._router.navigate(['']);
	}

}
