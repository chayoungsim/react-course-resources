/**
 * 대수 타입
 * -> 여러개의 타입을 합성해서 새롭게 만들어낸 타입
 * --> 합집합 타입과 교집합 타입이 존재합니다.
 */

/**
 * 1. 합집합 - Union 타입
 */

let a: string | number | boolean;
a=1;
a="hello";
a= true;

let arr: (number| string | boolean)[] = [1,"hello",true]



type Union1 = Dog | Person;

let union1 : Union1 = {
  name:"",
  color:""
}

let union2 : Union1 = {
  name:"",
  age:10
}

let union3 : Union1 = {
  name:"",
  color:"",
  age:10
}


// let unino4: Union1 = {
//     name :""
// }



/**
 * 2. 교집합 - Intersection 타입
 */

type Dog = {
  name:string;
  color:string;
}

type Person = {
  name:string;
  age:number;
}

type Intersection1 = Dog & Person

let intersection1 : Intersection1 = {
  name:"",
  color:"",
  age:10
}