/* Angular modules */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

/* Dependent modules */
import { ItemInfoTable } from '../common/common';

/** crawling module */
import axios from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';

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
  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {
    /* 라우터 매개변수 가져오기 */
    this.searchId = this._route.snapshot.paramMap.get('searchId')!;
    this.isFromRecentResult =
      this._route.snapshot.paramMap.get('isFromRecentResult') === '1';
  }

  /** 초기화 훅 메서드 */
  public ngOnInit(): void {
    /* 검색 요청 API 호출 */
    //this.crawlingItemInfo(this.searchId);
    this.fetchNaverHTML();
    //this.scrapeWebsite();
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
      });
  }

  public fetchNaverHTML() {
    fetch('https://www.naver.com', {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) return response.text();
        else throw new Error('서버 응답이 올바르지 않습니다.');
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  private async scrapeWebsite() {
    try {
      const url = `http://www.koreannet.or.kr/home/index.gs1`;
      const response = await axios.get(url); // 크롤링하려는 사이트의 URL을 넣어주세요.
      const html = response.data;
      const $: CheerioAPI = cheerio.load(html); // Cheerio를 사용하여 HTML 파싱

      // 원하는 데이터를 선택하기 위해 Cheerio의 선택자를 사용합니다.
      const title = $('title').text(); // 예시: 웹사이트의 <title> 태그 내용 가져오기

      console.log('Title:', title);

      // 추가적인 데이터 추출 및 조작을 위한 코드 작성
      // ...
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
      throw error;
    }
  }

  private crawlingItemInfo(searchId: string) {
    //const url = `http://www.koreannet.or.kr/home/index.gs1`;
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = `http://www.allproductkorea.or.kr/products/search?q=%7B%22mainKeyword%22:%${searchId}4%22,%22subKeyword%22:%22%22%7D&page=1&size=10`;
    const decodedUrl = decodeURI(url);
    console.log(`크롤링 ${decodedUrl} ...`);
    // URL에서 데이터를 가져옴
    fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      },
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.text();
        } else {
          return;
        }
      })
      .then((data) => {
        console.log(data);
      });
  }

  /** 뒤로 가기 버튼을 누를 경우 호출되는 메서드 */
  public onClickBackButton(): void {
    /* 최근 검색 페이지로부터 왔다면 최근 검색 페이지로 돌아가고, 아닐 경우 메인 페이지로 이동 */
    this._router.navigate([this.isFromRecentResult ? '/recent-result' : '']);
  }
}
