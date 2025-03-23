"use strict";

let movie = {
    title: `Millennium Actress`,
    director: {
        firstName: `Satoshi`,
        lastName: `Kon`,
        birthYear: 1963,
        deathYear: 2010,
    },
    year: 2001,
    // "is part of a saga": false,

    describe(){
        console.log(`title: ${this.title}\nyear: ${this.year}\ndir. ${this.director.firstName} ${this.director.lastName}\n`);
    }
}

console.log(`Movie:`);
movie.describe();

function Director(firstName, lastName, birthYear, deathYear){
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.deathYear = deathYear;
};

function Movie(title, director, year /*, isPartOfASaga*/){
    this.title = title;
    this.director = director;
    this.year = year;
    // this["is part of a saga"] = isPartOfASaga;
};

let leone = new Director(`Sergio`, `Leone`, 1929, 1989);
let dollars1 = new Movie(`A Fistful of Dollars`, leone, 1964);
let dollars2 = new Movie(`For a Few Dollars More`, leone, 1965);
let dollars3 = new Movie(`The Good, the Bad and the Ugly`, leone, 1966);

function Trilogy(title, movie1, movie2, movie3){
    this.title = title;
    this.movies = [movie1, movie2, movie3];
    movie1["is part of a saga"] = true;
    movie2["is part of a saga"] = true;
    movie3["is part of a saga"] = true;
}

let dollarsTrilogy = new Trilogy(`The Dollars Trilogy`, dollars1, dollars2, dollars3);

console.log(dollarsTrilogy);