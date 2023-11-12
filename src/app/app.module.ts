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
import { HeaderComponent } from './header/header.component';

import { BodyComponent } from './body/body.component';

import { CommonInfoComponent } from './common-info/common-info.component';
import { SearchResultComponent } from './search-result/search-result.component';

/** 앱 모듈 */
@NgModule({
	declarations: [
		AppComponent,

		HeaderComponent,

		BodyComponent,
		CommonInfoComponent,
		SearchResultComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		MaterialModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
