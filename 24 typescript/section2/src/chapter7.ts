// void 
// void -> 공허 -> 아무것도 없다
// void는 함수에서 반환값이 없을 때 사용한다
function sayHello(): void {
    console.log("Hello");
}
sayHello();


// never
// never는 절대 발생하지 않는 타입을 나타냅니다. 예를 들어, 함수가 항상 예외를 던지거나 무한 루프에 빠지는 경우에 사용됩니다.
// never 타입의 함수는 절대 정상적으로 종료되지 않기 때문에, 반환값이 없습니다. 따라서, never 타입의 함수는 void와는 다릅니다.

function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
    }
}