// 1. Object-Based Programming
const unitCircle = {
    x: 0,
    y: 0,
    radius: 1
};
unitCircle.style = {
    color: "red",
    thickness: 3
}
// 2. Class-Based Programming
// i. function
const Circle = function(x,y,radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.area = function(){
        return Math.PI * this.radius * this.radius;
    }
}
const circle1 = new Circle(0,100,200);
const circle2 = new Circle(100,200,300);
console.log(`Area of circle1 is ${circle1.area()}`)
// ii. class keyword
class ColorfulCircle {
    constructor(x,y,radius,color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    area(){
        return Math.PI * this.radius * this.radius;
    }
}
const circle3 = new ColorfulCircle(100,200,400,"blue");
console.log(`Area of circle1 is ${circle3.area()}`)
circle3.radius = -100;
// iii. ES12
class Cember {
    #_x;
    #_y;
    #_radius;
    #_color;
    constructor(x,y,radius,color) {
        this.#_x = x;
        this.#_y = y;
        this.#_radius = radius;
        this.#_color = color;
    }
    get radius(){
        return this.#_radius;
    }
    set radius(radius){
        console.log("setter for radius is working...")
        if (radius > 0)
          this.#_radius = radius;
    }
    area(){
        return Math.PI * this.radius * this.radius;
    }
}
const circle4 = new Cember(100,200,400,"blue");
console.log(`Area of circle1 is ${circle4.area()}`)
console.log(circle4.radius);
circle4.radius = -400;
console.log(circle4.radius);
circle4.radius = 800;
console.log(circle4.radius);
circle4.thickness = 3;
console.log(circle4.thickness);
