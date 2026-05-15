/**
 * 타입 추론
 */

// 점진적 타입시스템
// 타입 넗히기 
let a = 10;
let b = "hello";
let c = {
  id:1,
  name:"홍길동",
  profile: {
    nickname:"길동이"
  },
  urls:[
    "https://naver.com",
    "https://google.com"
  ]
}

let {id, name, profile } = c


// 암묵적 any 타입 타입이 계속적으로 진화한다
let d;
d= 10;
d.toFixed();

d="hello";
d.toUpperCase();  


// 리터럴 타입
const num = 10;
const str = "HELLO"

let arr = [1, "string"]