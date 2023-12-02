/* Angular modules */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Component modules */
import { BodyComponent } from './body/body.component';
import { CommonInfoComponent } from './common-info/common-info.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { RecentResultComponent } from './recent-result/recent-result.component';

/** 라우트 경로 배열 */
const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'common-info', component: CommonInfoComponent },
  {
    path: 'search-result/:location/:searchId/:isFromRecentResult',
    component: SearchResultComponent,
  },
  { path: 'recent-result/:location', component: RecentResultComponent },
];

/** 라우트 모듈 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
