"use strict";

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static randomPoint(ctx){
        const randomX = Math.floor(Math.random() * ctx.canvas.width);
        const randomY = Math.floor(Math.random() * ctx.canvas.height);
        return new Point(randomX, randomY);
    }

    midpoint(other) {
        const midX = (this.x + other.x) >> 1;
        const midY = (this.y + other.y) >> 1;
        return new Point(midX, midY);
    }

    draw(ctx){
        ctx.fillRect(this.x, this.y, 1, 1);
    }
}

class Figure {
    constructor() {
        if (this.constructor === Figure) {
            throw new Error("Cannot instantiate abstract class Figure");
        }
    }

    getRandomVertex(){
        const idx = Math.floor(Math.random() * this.vertices.length);
        return this.vertices[idx];
    }
}

class Triangle extends Figure {
    constructor(p1, p2, p3) {
        super();
        this.vertices = [p1, p2, p3];
    }

    randomTriangle(){ 
        return new Triangle(
            Point.randomPoint(ctx),
            Point.randomPoint(ctx),
            Point.randomPoint(ctx)
        );
    }
}

class Quadrilateral extends Figure {
    constructor(p1, p2, p3, p4) {
        super();
        this.vertices = [p1, p2, p3, p4];
    }
}

function chaosGame(figure, ctx, iterations = 50000){
    let p = new Point(
        Math.floor(Math.random() * ctx.canvas.width),
        Math.floor(Math.random() * ctx.canvas.height)
    );
    const intervalID = setInterval(() => {
        if (--iterations) {
            const v = figure.getRandomVertex();
            p = v.midpoint(p);
            p.draw(ctx);
        } else {
            clearInterval(intervalID);
        }
    }, 0,100);
}

function main(args = ["black", ""]){
    const canvas = document.getElementById("triangle");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = args[0];
    
    const isRandom = args[1] === "random";

    const triangle = isRandom ? Triangle.randomTriangle() : new Triangle(
        new Point(300, 100),
        new Point(100, 500),
        new Point(500, 500)
    );

    const button = document.getElementById("start");
    button.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        chaosGame(triangle, ctx, 100000);
    });

}

main();