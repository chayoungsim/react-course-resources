/**
 * 첫번째 사례
 */

//1. 두개가 같은 타입일 경우
function swap<T>(a:T, b:T) {
  return [b, a]
}
const [a, b] = swap(1, 2);

//2. 두개가 다른 타입일 경우
function swap2<T, U>(c:T, d:U) {
  return [c, d]
}
const [c, d] = swap2(1, "2");


/**
 * 두번쨰 사례
 */

//호출전에는 unknow 타입
function returnFirstValue<T>(data: [T, ...unknown[]]) {
  return data[0];
}

let num = returnFirstValue([0, 1, 2]);
// 0

let str = returnFirstValue([1, "hello", "mynameis"]);
// "hello"


interface A {
  length: number;
}

interface B extends A {}


//length: number 값을가지고 있는경우 포함
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}

getLength("123");

getLength([1, 2, 3]);

getLength({ length: 1 });

// getLength(undefined);

// getLength(null);
