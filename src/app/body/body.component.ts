/* Angular modules */
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

class AndroidClientApp {
  public onClickCameraButton(): void {
    console.log('onClickCameraButton()');
  }
  public onClickGalleryButton(): void {
    console.log('onClickGalleryButton()');
  }
  public onClickFeedbackButton(): void {
    console.log('onClickFeedbackButton()');
  }
  public onClickEmailButton(): void {
    console.log('onClickEmailButton()');
  }
  public onClickLocationButton(isClicked: boolean): void {
    console.log('onClickLocationButton()');
  }
}

declare global {
  interface Window {
    AndroidClientApp: AndroidClientApp;
    setBarcode: (barcode: string) => void;
    setLocation: (location: string) => void;
  }
}

/** 본문 페이지 컴포넌트 */
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  /** 바코드 번호 폼 컨트롤 (읽기 전용) */
  public readonly searchId = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
    Validators.pattern('[0-9]*'),
  ]);
  private _location = '경기도-수원시-영통구-원천동';

  /** 생성자
   * @param _router 라우터 (읽기 전용)
   */
  constructor(private readonly _router: Router) {
    //window.AndroidClientApp = new AndroidClientApp(); // 생성 안 하면 undefined 에러가 뜨지만 생성하면 안드로이드에서 인식 못함
    window.setBarcode = (barcode: string): void =>
      this.searchId.setValue(barcode);
    window.setLocation = (location: string): void => this.setLocation(location);
    /** 실행될때 위치 받아옴 */
    //window.AndroidClientApp.onClickLocationButton(false);
  }

  /** 검색 버튼을 누를 경우 호출되는 메서드 */
  public onClickSearchButton(): void {
    /* 입력된 바코드 번호를 첨부하여 검색 결과 페이지로 이동 */
    this._router.navigate([
      '/search-result',
      this._location,
      this.searchId.value,
      '0',
    ]);
  }

  /** 최근 결과 버튼을 누를 경우 호출되는 메서드 */
  public onClickRecentResultButton(): void {
    /* 최근 결과 페이지로 이동 */
    this._router.navigate(['/recent-result', this._location]);
  }

  /** 카메라 버튼을 누를 경우 호출되는 메서드 */
  public onClickCameraButton(): void {
    // 카메라 앱 실행 요청 API 호출...
    window.AndroidClientApp.onClickCameraButton();
  }

  /** 갤러리 버튼을 누를 경우 호출되는 메서드 */
  public onClickGalleryButton(): void {
    // 갤러리 앱 실행 요청 API 호출...
    window.AndroidClientApp.onClickGalleryButton();
  }

  /** 기본 상식 버튼을 누를 경우 호출되는 메서드 */
  public onClickCommonInfoButton(): void {
    /* 기본 상식 페이지로 이동 */
    this._router.navigate(['/common-info']);
  }

  /** 피드백 버튼을 누를 경우 호출되는 메서드 */
  public onClickFeedbackButton(): void {
    // 개발자 이메일 Intent 요청 API 호출...
    window.AndroidClientApp.onClickFeedbackButton();
  }

  public onClickLocationButton(): void {
    // 위치 정보 Intent 요청 API 호출...
    window.AndroidClientApp.onClickLocationButton(true);
  }

  public setLocation(location: string) {
    this._location = location;
  }

  public getLocationName(): string {
    let locationSummary = '';
    const locationArray = this._location.split('-');
    for (let i = 2; i < locationArray.length; ++i) {
      locationSummary += locationArray[i] + ' ';
    }
    return locationSummary;
  }
}
