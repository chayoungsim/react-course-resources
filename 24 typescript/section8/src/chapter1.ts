/**
 * 인덱스트 엑세스 타입
 */

interface Post {
  title: string;
  contest: string;
  author: {
    id: number;
    name: string;
    age: number;  
  }
}

//Post["author"] author은 타입니다.
function printAuthorInfo(author:Post["author"]) {
   console.log(`${author.name} =${author.id}`)
}

// 배열과 함께 사용하는 방법

type PostList = {
  title: string;
  contest: string;
  author: {
    id: number;
    name: string;
    age: number;  
  }
}[];

//[number] 타입 
function printAuthorInfo2(author:PostList[number]["author"]) {
  console.log(`${author.name} =${author.id}`)
}


const post: PostList[0] = {
  title:"게시글 제목",
  contest:"게시글 내용",
  author:{
    id:1,
    name:"홍길동",
    age:20
  }
}


printAuthorInfo2(post.author);


type Tup = [number, string, boolean];

type Tup0 = Tup[0];
// number

type Tup1 = Tup[1];
// string

type Tup2 = Tup[2];
// boolean

type Tup3 = Tup[number]
// number | string | boolean
