"use strict";

let studentName = "Giuseppe";
let age = 27;
let isEnrolled = true;

console.log(studentName, typeof studentName, "\n", age, typeof age, "\n", isEnrolled, typeof isEnrolled);

function studentInfo(studentName, age, course="Web Technologies", isEnrolled=true){
    console.log(`${studentName} (${age}) ` + (isEnrolled?`is `:`is NOT `) + `enrolled in the ${course} course`);
}

studentInfo(studentName, age);

studentInfo("Claudio", 65, "Programming Languages 2", false);

studentInfo(23, "24", 25, 26);
