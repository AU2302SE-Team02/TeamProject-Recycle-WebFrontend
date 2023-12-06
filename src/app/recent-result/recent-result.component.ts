/* Angular modules */
import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  /** 현재 위치 */
  public readonly location: string = '';
  /** 최근 검색 결과 */
  public readonly recentResultList: ItemInfoTable[] = [];
  /** 생성자
   * @param _router 라우터 (읽기 전용)
   */
  @ViewChildren('barcode') barcodeElements: QueryList<ElementRef> | undefined;
  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {
    /* 라우터 매개변수 가져오기 */
    this.location = this._route.snapshot.paramMap.get('location')!;
    this._getItemPromise = Promise.resolve();
  }

  /** 초기화 훅 메서드 */
  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    if (window.AndroidClientApp !== undefined) {
      this._getItemPromise = new Promise<any>((resolve, reject) => {
        window.AndroidClientApp.onClickLoadLog() as unknown as string;
      });
      this._getItemPromise
        .then((result) => {
          if (result.ok) {
            return result.json();
          } else {
            throw new Error('서버 응답이 올바르지 않습니다.');
          }
        })
        .then((json) => {
          for (let item of json) {
            this.recentResultList.push(
              new ItemInfoTable({
                itemId: item.itemBarcode,
                itemDocuId: item.itemBarcode,
                itemName: item.itemName,
                itemDateCreated: item.itemSearchDate,
                itemDateModified: item.itemSearchDate,
                itemImageLink: item.itemImageLink,
                itemParts: { Unknown: 'unknown' },
              })
            );
          }
          setTimeout(() => {
            this.generateAllBarcodes(), 0;
          });
        });
    }
    /**
    this._getItemPromise = fetch('assets/test-recent-result.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('서버 응답이 올바르지 않습니다.');
        }
      })
      .then((json) => {
        /* JSON 데이터를 이용해 정보 저장 
        json.items.forEach((item: any) => {
          this.recentResultList.push(new ItemInfoTable(item));
        });
        setTimeout(() => {
          this.generateAllBarcodes(), 0;
        });
      }); */
  }

  /** 다시 검색 버튼을 누를 경우 호출되는 메서드 */
  public onClickSearchAgainButton(itemId: string): void {
    /* 검색 결과 페이지로 이동 */
    this._router.navigate(['/search-result', this.location, itemId, '1']);
  }

  public generateBarcode(barcodeValue: string) {
    JsBarcode(`#i${barcodeValue}`, barcodeValue, {
      format: 'CODE128',
      lineColor: '#000',
      width: 2,
      height: 30,
      displayValue: true,
    });
  }

  public generateAllBarcodes() {
    this.barcodeElements!.toArray().forEach((element, index) => {
      this.generateBarcode(this.recentResultList[index].id);
    });
  }

  public getReadableDate(date: string): string {
    const dateObject = new Date(date);
    return `${dateObject.getFullYear()}년 ${
      dateObject.getMonth() + 1
    }월 ${dateObject.getDate()}일`;
  }

  private _getItemPromise: Promise<any>;
}
