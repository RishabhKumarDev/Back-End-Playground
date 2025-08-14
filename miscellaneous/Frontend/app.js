class Person {
  constructor(name, age) {
    console.log("this will be logged 2");

    this.name = name;
    this.age = age;
  }

  talk() {
    console.log(`hey, my name is ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, age, marks) {
    console.log("this will be logged 1");

    super(name, age);
    console.log("this will be logged 3");

    this.marks = marks;
  }
}
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }
}
