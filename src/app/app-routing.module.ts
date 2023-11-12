import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodyComponent } from './body/body.component';
import { CommonInfoComponent } from './common-info/common-info.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
	{ path: '', component: BodyComponent },
	{ path: 'common-info', component: CommonInfoComponent },
	{ path: 'search-result/:searchId', component: SearchResultComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
