//object type annotation
//객체리터럴 타입  
//구조기준 구조적 타입시스템
//프로퍼티 타입시스템
let user = {
    id: 1,
    name: "Alice"
};
let config = {
    apiKey: "1234567890abcdef"
};
export {};
//config.apiKey = "newApiKey"; // 오류: 읽기 전용 프로퍼티는 수정할 수 없습니다.
