"use strict";

let btn = document.getElementById("btn");
btn.onclick = () => {
    let req = new XMLHttpRequest(); 
    req.onload = handleFact;
    req.open("GET", "https://catfact.ninja/fact"); 
    req.send();
    function handleFact(result) {
        let fact = JSON.parse(this.responseText);
        document.getElementById("fact").innerHTML = fact.fact;
    }
}