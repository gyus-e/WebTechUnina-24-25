"use strict";

function Person(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}

let gianmario = new Person("Gianmario", "Capasso");
let claudio = new Person("Claudio", "Lai");

function greet(){
    console.log(`Hello, I'm ${this.firstName} ${this.lastName}`);
}
Person.prototype.greet = greet;

//1. oggetto "gianmario" non ha il metodo greet, risale nell'albero dei prototipi
//2. prototipo "Person" ha il metodo greet, lo esegue con this = giuseppe

gianmario.greet();
claudio.greet();

function Student(firstName, lastName, degreeProgram){
    Person.call(this, firstName, lastName);
    this.degreeProgram = degreeProgram;
}
Object.setPrototypeOf(Student.prototype, Person.prototype)

let giuseppe = new Student("Giuseppe", "Amato", "Computer Science");
let riccardo = new Student("Riccardo", "Elena", "Computer Science");

giuseppe.greet();
riccardo.greet();

//1. oggetto "giuseppe" non ha il metodo greet, risale nell'albero dei prototipi
//2. prototipo "Student" non ha il metodo greet, risale nell'albero dei prototipi
//3. prototipo "Person" ha il metodo greet, lo esegue con this = giuseppe

Student.prototype.greet = function greet() {
    console.log(`Hello, I'm ${this.firstName} ${this.lastName} and I'm a ${this.degreeProgram} student`);
}

gianmario.greet();
claudio.greet();
giuseppe.greet();
riccardo.greet();

//1. oggetto "gianmario", creato col costruttore Person, non ha il metodo greet, risale nell'albero dei prototipi
//2. prototipo "Person" ha il metodo greet, lo esegue con this = gianmario
//3. oggetto "giuseppe", creato col costruttore Student, non ha il metodo greet, risale nell'albero dei prototipi
//4. prototipo "Student" ha il metodo greet, lo esegue con this = giuseppe