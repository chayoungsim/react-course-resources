/**
 * 타입좁히기
 * 조건문 등을 이용해 넓은 타입에서 좁은 타입으로
 * 타입을 상황에 따라 좁히는 방법을 이야기
 */

type Person = {
  name:string;
  age:number;
}

// value => number : toFixed
// value => string : toUpperCase
// value => Date : getTime
// value => Person : name은 age살 입니다.

function func(value: number | string | Date | null | Person) {
  if(typeof value === "string") {
    value.toUpperCase();
  } else if(typeof value === "number") {
    value.toFixed();
  } else if(value instanceof Date) {
    value.getDate();
  } else if(value && "age" in value) {
    console.log(`${value.name}의 나이는 ${value.age}살 입니다.`)
  }
}

