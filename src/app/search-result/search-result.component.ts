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
  /** 검색한 바코드 번호 (읽기 전용) */
  public readonly searchId: string = '';
  /** 최근 검색 페이지로부터 왔는지 여부 (읽기 전용) */
  public readonly isFromRecentResult: boolean = false;
  /** 검색 결과 물건 정보 테이블 */
  public itemInfoTable: ItemInfoTable = undefined as unknown as ItemInfoTable;

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
    this.searchId = this._route.snapshot.paramMap.get('searchId')!;
    this.isFromRecentResult =
      this._route.snapshot.paramMap.get('isFromRecentResult') === '1';
  }

  public ngAfterViewInit(): void {
    /* 검색 요청 API 호출 */
    fetch('assets/test-result.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('서버 응답이 올바르지 않습니다.');
        }
      })
      .then((json) => {
        /* JSON 데이터를 이용해 정보 저장 */
        this.itemInfoTable = new ItemInfoTable(json);
        return;
      })
      .then(() => {
        setTimeout(() => {
          this.generateBarcode(this.searchId), 0;
        });
        this.crawlingInfos();
      });
  }

  public generateBarcode(barcodeValue: string) {
    JsBarcode(`#barcode`, barcodeValue, {
      format: 'CODE128',
      lineColor: '#000',
      width: 2.5,
      height: 30,
      displayValue: false,
    });
  }

  public crawlingInfos() {
    let itemName = '';
    let itemImgSrc = '';
    return fetch(`/getInfo/home/hpisSrchGtin.gs1?gtin=${this.searchId}`)
      .then((res) => {
        if (res.ok) return res.text();
        else throw new Error();
      })
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        const itemNameInfoDiv = doc.querySelectorAll('.productTit');
        if (itemNameInfoDiv.length > 0) {
          const itemNameInnerHtml = itemNameInfoDiv[0].innerHTML;
          const pattern = /([\s\S]+?)\s*$/i;

          // 정규식을 사용하여 원하는 부분 추출
          const match = itemNameInnerHtml.match(pattern);

          if (match) {
            const extractedText = match[0].trim();
            const textArray = extractedText.split(' ');
            for (let i = 2; i < textArray.length; i++) {
              itemName += textArray[i] + ' ';
            }
          } else {
            console.log('이름 패턴을 찾을 수 없습니다.');
          }
        } else {
          console.log('이름을 찾을 수 없습니다.');
        }

        const itemImgHtml = doc.querySelectorAll('#detailImage');
        if (itemImgHtml.length > 0) {
          itemImgSrc = doc
            .querySelectorAll('#detailImage')[0]
            .getAttribute('src')!;
        } else {
          console.log('이미지를 찾을 수 없습니다.');
        }
        this.itemInfoTable.name = itemName;
        this.itemInfoTable.imageLink = itemImgSrc;
      });
  }

  /** 뒤로 가기 버튼을 누를 경우 호출되는 메서드 */
  public onClickBackButton(): void {
    /* 최근 검색 페이지로부터 왔다면 최근 검색 페이지로 돌아가고, 아닐 경우 메인 페이지로 이동 */
    this._router.navigate([this.isFromRecentResult ? '/recent-result' : '']);
  }
}
