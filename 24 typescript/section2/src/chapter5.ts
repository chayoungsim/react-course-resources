// enum 타입
// 여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입
// enum은 숫자형과 문자열형이 있다.
// 숫자형 enum은 기본적으로 0부터 시작하여 1씩 증가하는 숫자값이 할당된다.
// 문자열형 enum은 각 멤버에 문자열 값을 명시적으로 할당해야 한다.
// enum은 코드의 가독성을 높이고, 특정 값들의 집합을 표현할 때 유용하다.
// enum은 컴파일시 JavaScript로 변환되며, 런타임에서도 사용할 수 있다.


enum Role {
  ADMIN = 11,
  USER ,
  GUEST,
}

enum Language {
  ENGLISH = "en",
  KOREAN = "ko",
  JAPANESE = "jp",
}

const user1 = {
  name: "Alice",
  role: Role.ADMIN,
  language: Language.ENGLISH,
};

const user2 = {
  name: "Bob",
  role: Role.USER,
  language: Language.KOREAN,
}

const user3 = {
  name: "Charlie",
  role: Role.GUEST, 
  language: Language.JAPANESE,
}

console.log(user1, user2, user3);