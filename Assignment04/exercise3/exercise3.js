"use strict";

const N = 10000;

let steps_for = new Array();
steps_for[1] = 0;

function collatz(n){
    if (steps_for[n] === undefined){
        if (n % 2 === 0){
            steps_for[n] = 1 + collatz(n >> 1);
        }
        else {
            steps_for[n] = 1 + collatz(3 * n + 1);
        }
    }
    return steps_for[n];
}

function printResult(n, steps){
    console.log(`Collatz proved for n=${n}: sequence converges to 1 in ${steps} steps`);
}

for (let i = 2; i <= N; i++){
    printResult(i, collatz(i));
}
