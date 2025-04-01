let promise = new Promise(function(resolve, reject){
    let number = Math.random();
    setTimeout( () => { // setTimeout takes as input a callback and a time in ms
        if(number > 0.5){
        resolve(number);
        } else {
        reject(new Error("Number too small"));
        }
    }, 1000);
    });

console.log(promise); // Promise { <state>: "pending" }

console.log("Here");

// gli handler sono eseguiti nell'ordine in cui sono dichiarati
promise.finally( () => {console.log("Promise settled")} ) // eseguito quando la promessa viene risolta
promise.then(
    (result) => {console.log(`Done: ${result}`)},
    (error) => {console.log(error.message)}
);
promise.finally( () => {console.log("second finally, after result or error")}  );

console.log("There");