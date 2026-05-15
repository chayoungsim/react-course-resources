// 배열
let arr1: number[] = [1, 2, 3, 4, 5];
let arr2: string[] = ["apple", "banana", "cherry"];
let arr3: boolean[] = [true, false, true];
let arr4: Array<number> = [10, 20, 30]; // 제네릭 배열
let arr5: Array<string> = ["TypeScript", "JavaScript", "Python"];
let arr6: Array<boolean> = [false, true, false];  

// 배열에 들어가는 요소들의 타입이 다양할 경우
let arr7: (number | string)[] = [1, "two", 3, "four"]; // 유니언 타입을 사용한 배열
let arr8: Array<number | string> = [5, "six", 7, "eight"]; // 제네릭 배열과 유니언 타입을 함께 사용


// 다차원 배열의 타입을 정의 하는 방법
let matrix1: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// 튜플
// 길이와 타입이 고정된 배열
let tuple1: [number, string] = [1, "one"];
let tuple2: [string, boolean, number] = ["hello", true, 42];

const users : [number, string, boolean][] = [
    [1, "Alice", true],
    [2, "Bob", false],
    [3, "Charlie", true]
];