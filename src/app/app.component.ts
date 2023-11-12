/* Angular modules */
import { Component } from '@angular/core';

/* 앱 컴포넌트 */
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	/** 앱 제목 (읽기 전용) */
	public readonly title: string = 'Recycle';
}
