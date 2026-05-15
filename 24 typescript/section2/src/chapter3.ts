
//object type annotation
//객체리터럴 타입  
//구조기준 구조적 타입시스템
//프로퍼티 타입시스템
let user:{
  id?: number; // 선택적 프로퍼티
  name: string;
} = {
  id: 1,
  name: "Alice"
}


let config: {
  readonly apiKey: string; // 읽기 전용 프로퍼티
} = {
  apiKey: "1234567890abcdef"
}

//config.apiKey = "newApiKey"; // 오류: 읽기 전용 프로퍼티는 수정할 수 없습니다.