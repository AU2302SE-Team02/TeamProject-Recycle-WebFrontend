/** 물건 정보 테이블 */
export class ItemInfoTable {
  /** ID */
  public id: string = '';
  /** 문서 ID */
  public documentId: string = '';
  /** 이름 */
  public name: string = '';
  /** 생성된 날짜 */
  public dateCreated: string = '';
  /** 수정된 날짜 */
  public dateModified: string = '';
  /** 이미지 링크 */
  public imageLink: string = '';
  /** 부분 정보 */
  public parts: { type: string; description: string }[] = [];

  /** 생성자 */
  constructor(table: any) {
    /* 검색된 물건 정보 저장 */
    this.id = table.itemId;
    this.documentId = table.itemDocuId;
    this.name = table.itemName;
    this.dateCreated = table.itemDateCreated;
    this.dateModified = table.itemDateModified;
    this.imageLink = table.itemImageLink;

    /* 부분 정보 데이터 배열화 */
    const keys = Object.keys(table.itemParts);
    const values = Object.values(table.itemParts) as string[];
    for (let i = 0; i < keys.length; ++i) {
      this.parts.push({ type: keys[i], description: values[i] });
    }

    /* General 항목이 있을 경우, 제일 첫 번째 줄에 오도록 위치 변경 */
    const general = this.parts.find((part) => part.type === 'General');
    if (general !== undefined) {
      this.parts.splice(this.parts.indexOf(general), 1);
      this.parts.unshift(general);
    }

    /* 확인용 콘솔 출력 */
    console.log(this);
  }
}
