// any
// 특정 변수의 타입을 우리가 확실히 모를떄
// any는 모든 타입을 허용하는 타입입니다. any 타입의 변수는 어떤 값이든 할당할 수 있습니다.


let a: any = 123;
a = "Hello";
a = true;
a = { name: "Alice" };
a = [1, 2, 3];


// unknown
let b: unknown = 123;
b = "Hello";
b = true;
b = { name: "Alice" };
b = [1, 2, 3];

// unknown 타입은 any와 달리 어떤 값이든 할당할 수 있지만, 그 값을 사용할 때는 타입 검사를 해야 합니다.
// 예를 들어, unknown 타입의 변수를 문자열로 사용하려면 먼저 타입 검사를 해야 합니다.
if (typeof b === "string") {
  console.log(b.toUpperCase());
}