/**
 * 타입 단언 assertion
 */

type Person = {
  name:string;
  age:number;
}

let person = {} as Person;  // 타입 단언  
person.name = "홍길동";
person.age = 10;

type Dog = {
  name:string;
  color:string;
}

let dog = {
  name:"돌돌이",
  color:"white",
  breed:"진도"
} as Dog;

/**
 * 타입 단언의 규칙
 * 값 as 단언 <- 단언식
 * A as B
 * A 가 B의 슈퍼타입이나
 * A 가 B의 서브타입이어야 함 
 */

let num1 = 10 as never;
let num2 = 10 as unknown;


/**
 * const 단언
 */

let num4 = 10 as const;

let cat = {
  name:"야옹이",
  color:"white"
} as const;

/**
 * Non Null 단언
 */

type Post = {
  title:string;
  author?:string;
}

let post: Post = {
  title:"게시글1",
  author:"이전환"
}

//const len: number = post.author?.length;  ? : 값이 없으면 undefined으로 할당
// number에 undefinded값은 들어갈수없다.

// num | undefined로 생각되지않게 한다.
const len: number = post.author!.length;