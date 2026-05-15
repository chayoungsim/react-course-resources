/* 기본 타입간의 호환성 */

/**
 * 객체 타입간의 호환성
 * -> 어떤 객체타입을 다른 객체타입으로 취급해도 괜찮은가?
 */

//구조적 타입시스템


type Animal = {
  name: string;
  age: number;

}

type Dog = {
  name: string;
  age: number;
  kind: string;
} 

let animal :Animal = {
  name:"기린",
  age:10
}

let dog:Dog = {
  name:"돌돌이",
  age:20,
  kind:"진도"
}

animal = dog;  //업캐스팅
//dog = animal;  

//슈퍼
type Book = {
  name:string;
  price:number;
}

//서브
type ProgrammingBook = {
  name:string;
  price:number;
  skill:string;
}


let book : Book;
let programmingBook : ProgrammingBook = {
  name:"한 입 크기로 잘라먹는 리액트",
  price:33000,
  skill:"리액트"
}

book  = programmingBook;


/**
 * 초과 프로퍼티 검사
 */

let book2 : Book ={
  name:" 한입 크리고",
  price:33000,
  //skill:"리액트"
}

let book3:Book =programmingBook;