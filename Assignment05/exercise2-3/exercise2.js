"use strict";

export function createMultiStepFilterer(array){
    let ret = [];
    for (let elem of array) {
        ret.push(elem);
    }

    function filterer(filterCriterion){
        if (typeof filterCriterion === 'function') {
            ret = ret.filter(filterCriterion);
        }
        return ret;
    }
    return filterer;
}