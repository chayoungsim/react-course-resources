/** 
 * keyof 연산자
 */

//1.
// interface Person {
//   name: string;
//   age: number;
// }

//2
type Person = typeof person;

//function getPropertyKey(person: Person, key: "name" | "age") {
//function getPropertyKey(person: Person, key: keyof Person) {
function getPropertyKey(person: Person, key: keyof typeof person) {
  return person[key];
}

//const person: Person = {
const person = {  
  name: "이정환",
  age: 27,
};

getPropertyKey(person,"name") //이정환




