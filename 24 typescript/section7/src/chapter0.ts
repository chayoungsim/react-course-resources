/**
 * 제네릭
 */


// 함수의 타입을 가변적으로 
// 모든 타입에 두루두루 쓸수있는 타입

// 제네릭 함수
// <T> 타입변수
// 함수를 호출할때 인수에따라 결정된다.

function func<T>(value: T): T {
  return value;
}

let num = func(10);
// num.toUpperCase();

if (typeof num === "number") {
  num.toFixed();
}

let bool = func(true);

let str = func("string");

let arr = func<[number, number, number]>([1, 2, 3]);
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}