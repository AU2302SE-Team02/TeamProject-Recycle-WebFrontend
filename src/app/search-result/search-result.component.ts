/* Angular modules */
import { Component, Injectable, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* Dependent modules */
import { ItemInfoTable } from '../common/common';
import JsBarcode from 'jsbarcode';

/** 검색 결과 페이지 컴포넌트 */
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  /** 현재 위치 */
  public readonly location: string = '';
  /** 검색한 바코드 번호 (읽기 전용) */
  public readonly searchId: string = '';
  /** 최근 검색 페이지로부터 왔는지 여부 (읽기 전용) */
  public readonly isFromRecentResult: boolean = false;
  /** 검색 결과 물건 정보 테이블 */
  public itemInfoTable: ItemInfoTable = undefined as unknown as ItemInfoTable;
  /** 검색 결과 물건 정보 json */
  public itemInfoJson: any = undefined as unknown as any;
  /** 자세한 재질 정보 열렸는지 여부 */
  public isDetailed: boolean;

  /** 생성자
   * @param _router 라우터 (읽기 전용)
   * @param _route 라우터 매개변수 모음집 (읽기 전용)
   */
  @ViewChild('barcode') barcodeElement: any;
  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {
    /* 라우터 매개변수 가져오기 */
    this.location = this._route.snapshot.paramMap.get('location')!;
    this.searchId = this._route.snapshot.paramMap.get('searchId')!;
    this.isFromRecentResult =
      this._route.snapshot.paramMap.get('isFromRecentResult') === '1';
    this.isDetailed = true;
    this.itemInfoJson = {
      itemId: `${this.searchId}`,
      itemDocuId: `${this.searchId}`,
      itemName: '물건 정보를 찾을 수 없습니다',
      itemDateCreated: '2023/12/31',
      itemDateModified: '2023/12/31',
      itemImageLink: 'assets/no-image-icon.png',
      itemParts: { Unknown: '분리배출 정보를 찾을 수 없습니다' },
    };
  }
  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    /* 검색 요청 API 호출 */
    this.getItemFromKN().then(() => {
      this.getItemFromDB().then(() => {
        this.itemInfoTable = new ItemInfoTable(this.itemInfoJson);
        setTimeout(() => {
          this.generateBarcode(this.searchId), 0;
        });
      });
    });

    /**
    fetch('assets/test-result.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('서버 응답이 올바르지 않습니다.');
        }
      })
      .then((json) => {
        JSON 데이터를 이용해 정보 저장
        this.itemInfoTable = new ItemInfoTable(json);
        return;
      })
      .then(() => {
        setTimeout(() => {
          this.generateBarcode(this.searchId), 0;
        });
      })
      .catch((error) => {
        console.log(error);
      }); */
  }

  /** koreannet에서 상품이름과 상품이미지 받아오기 */
  private getItemFromKN(): Promise<any> {
    const url = `/api/kn/${this.searchId}`;
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('서버 응답이 올바르지 않습니다.');
        }
      })
      .then((data) => {
        if (data.knItemName !== null) {
          console.log('이름 업데이트');
          this.itemInfoJson.itemName = data.knItemName;
        }
        if (data.knItemImageSrc !== null) {
          console.log('이미지주소 업데이트');
          this.itemInfoJson.itemImageLink = data.knItemImageSrc;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /** DB에서 믈건 나머지 정보 받아오기 */
  private getItemFromDB(): Promise<any> {
    const url = `/api/db/${this.searchId}`;
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('서버 응답이 올바르지 않습니다.');
        }
      })
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  public generateBarcode(barcodeValue: string): void {
    JsBarcode(`#barcode`, barcodeValue, {
      format: 'CODE128',
      lineColor: '#000',
      width: 2.5,
      height: 30,
      displayValue: false,
    });
  }

  /** 재질 정보 자세히 토글 */
  public onClickDetailedButton(): void {
    this.isDetailed = !this.isDetailed;
  }
}
