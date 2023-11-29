/* Angular modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

/* Dependent modules */
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

/* Component modules */

/* Header */
import { HeaderComponent } from './header/header.component';

/* Body */
import { BodyComponent } from './body/body.component';
import { CommonInfoComponent } from './common-info/common-info.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { RecentResultComponent } from './recent-result/recent-result.component';
import { HttpClientModule } from '@angular/common/http';

/** 앱 모듈 */
@NgModule({
  declarations: [
    /* App */
    AppComponent,

    /* Header */
    HeaderComponent,

    /* Body */
    BodyComponent,
    CommonInfoComponent,
    SearchResultComponent,
    RecentResultComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
