/* Angular modules */
import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import JsBarcode from 'jsbarcode';
/* Dependent modules */
import { ItemInfoTable } from '../common/common';

/** 최근 검색 결과 페이지 컴포넌트 */
@Component({
  selector: 'app-recent-result',
  templateUrl: './recent-result.component.html',
  styleUrls: ['./recent-result.component.scss'],
})
export class RecentResultComponent {
  public readonly recentResultList: ItemInfoTable[] = [];
  /** 생성자
   * @param _router 라우터 (읽기 전용)
   */
  @ViewChildren('barcode') barcodeElements: QueryList<ElementRef> | undefined;
  constructor(private readonly _router: Router) {
    this._getItemPromise = Promise.resolve();
  }

  /** 초기화 훅 메서드 */
  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this._getItemPromise = fetch('assets/test-recent-result.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('서버 응답이 올바르지 않습니다.');
        }
      })
      .then((json) => {
        /* JSON 데이터를 이용해 정보 저장 */
        json.items.forEach((item: any) => {
          this.recentResultList.push(new ItemInfoTable(item));
        });
        setTimeout(() => {
          this.generateAllBarcodes(), 0;
        });
      });
  }

  /** 다시 검색 버튼을 누를 경우 호출되는 메서드 */
  public onClickSearchAgainButton(itemId: string): void {
    /* 검색 결과 페이지로 이동 */
    this._router.navigate(['/search-result', itemId, '1']);
  }

  /** 뒤로 가기 버튼을 누를 경우 호출되는 메서드 */
  public onClickBackButton(): void {
    /* 메인 페이지로 이동 */
    this._router.navigate(['']);
  }

  public generateBarcode(barcodeValue: string) {
    JsBarcode(`#i${barcodeValue}`, barcodeValue, {
      format: 'CODE128',
      lineColor: '#000',
      width: 2,
      height: 30,
      displayValue: true,
    });
    //JsBarcode(element.nativeElement, barcodeValue);
  }

  generateAllBarcodes() {
    this.barcodeElements!.toArray().forEach((element, index) => {
      this.generateBarcode(this.recentResultList[index].id);
    });
  }

  private _getItemPromise: Promise<any>;
}
