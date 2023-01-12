const circle1 = {
    x: 0,
    y: 0,
    radius: 1
};
const style = {color: "red", thickness: 3};
const circle2 = {...circle1, style};
console.log(circle1);
console.log(circle2);
const circle3 = {...circle1};
circle3.style = style;
