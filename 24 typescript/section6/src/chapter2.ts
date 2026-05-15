/**
 * 접근 제어자
 * access modifier
 * => public private proteced (공공, private: 외부에서 접근제한, 파생클래스에서도 접근이 안됨 , proteced : 파생클래스에서 접근가능 )
 */

class Employee {
  // 필드

  // 생성자
  constructor(
    private name: string,
    protected age: number,
    public position: string
  ) {}

  // 메서드
  work() {
    console.log(`${this.name} 일함`);
  }
}

class ExecutiveOfficer extends Employee {
  // 필드
  officeNumber: number;

  // 생성자
  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number
  ) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }

  // 메서드
  func() {
    this.age;
    // this.name;
  }
}

const employee = new Employee("이정환", 27, "developer");
// employee.name = "홍길동";
// employee.age = 30;
employee.position = "디자이너";

console.log(employee);