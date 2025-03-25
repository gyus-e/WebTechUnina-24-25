"use strict";

function createMultiStepFilterer(array){
    let ret = [];
    for (let elem of array) {
        ret.push(elem);
    }

    function filterer(filterCriterion){
        if (typeof filterCriterion === 'function') {
            let idx = 0;
            for (let elem of ret) {
                if (filterCriterion(elem)) {
                    ret[idx] = elem;
                    idx++;
                }
            }
            ret.length = idx;
        }
        return ret;
    }
    return filterer;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 
let filterer = createMultiStepFilterer(arr); 
 
console.log(filterer()); //Array(10) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
 
console.log(filterer(function(elem){ 
  return elem % 2 !== 0 //remove elements that are even 
})); //Array(5) [1, 3, 5, 7, 9] 
 
console.log(filterer("Foo")); //Array(5) [1, 3, 5, 7, 9] 
 
console.log(filterer(function(elem){ 
  return elem % 3 !== 0 //remove elements that are also multiple of three 
})); //Array(3) [1, 5, 7] 
 
console.log(arr); //Array(10) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
