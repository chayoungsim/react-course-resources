// 타입 별칭  타입을 변수처럼

type User = {
  id?: number; // 선택적 프로퍼티
  name: string;
  nickname?: string; // 선택적 프로퍼티
  birthdate?: Date; // 선택적 프로퍼티
  bio?: string; // 선택적 프로퍼티  
  location?: string; // 선택적 프로퍼티
}

let user: User = {
  id: 1,
  name: "Alice",
  nickname: "Ally",
  birthdate: new Date("1990-01-01"),
  bio: "Software developer and tech enthusiast.",
  location: "New York"
}

let user2: User = {
  name: "Bob"
}

// 인덱스 시그니처
// 객체의 프로퍼티 이름과 타입이 동적으로 결정되는 경우
// 키와 값이 규칙을 따르는 객체의 타입을 정의할 때 사용
type Dictionary = {
  [key: string]: string; // 모든 프로퍼티의 이름은 문자열이고, 값도 문자열입니다.
} 

let dict: Dictionary = {
  "apple": "A fruit that is sweet and crisp.",
  "banana": "A long, yellow fruit that is soft and sweet.",
  "cherry": "A small, round fruit that is red or black."
}

type CountryNumberCodes ={
  [key:string] : number;
  Korea: number; // 특정 프로퍼티도 정의할 수 있습니다. 
}

const counteryCodes : CountryNumberCodes = {
  "Korea": 82,
  "US": 1,
  "UK": 44,
  "FR": 33,
  "DE": 49
}