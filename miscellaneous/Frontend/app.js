// first way -- Factory function
function personMaker(name, age) {
  const person = {
    name,
    age,
    talk() {
      console.log(`hii my name is ${this.name}`);
    },
  };

  return person;
}
// each obj will take space for every talk method
const p1 = personMaker("rahu", 45000);
const p2 = personMaker("katu", 45000);

// second way :== Constructors function { convension :- starts with Capital letter && doesn't return anything}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.talk = function () {
  console.log(`hii i am ${this.name}`);
};

const pp1 = new Person("ati", 23);
const pp2 = new Person("andf", 20);

// third way:- Using classes and constructor method (special methods for classes);

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  talk() {
    console.log(`hi i am ${this.name} and i got created using a classes`);
  }
}
