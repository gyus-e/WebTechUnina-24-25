"use strict";

export function createMultiStepFilterer(array){
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