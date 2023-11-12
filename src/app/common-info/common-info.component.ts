import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-common-info',
	templateUrl: './common-info.component.html',
	styleUrls: ['./common-info.component.scss'],
})
export class CommonInfoComponent {

	constructor(private readonly _router: Router) { }

	public onClickBackButton(): void {
		this._router.navigate(['']);
	}
}
