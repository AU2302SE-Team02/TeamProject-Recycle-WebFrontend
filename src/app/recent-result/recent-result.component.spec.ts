import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentResultComponent } from './recent-result.component';

describe('RecentReaultComponent', () => {
	let component: RecentResultComponent;
	let fixture: ComponentFixture<RecentResultComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [RecentResultComponent]
		});
		fixture = TestBed.createComponent(RecentResultComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
