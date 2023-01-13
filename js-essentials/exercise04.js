const circle1 = {
    x: 0,
    y: 0,
    radius: 1,
    style: {
        color: "red",
        thickness: 3
    }
};
const {x,y,...rest} = circle1;
const {color, thickness} = rest.style;
console.log(x,y)
console.log(rest)
console.log(color)
console.log(thickness)
console.log(circle1)