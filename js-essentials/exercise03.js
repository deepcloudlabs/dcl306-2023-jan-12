const circle1 = {
    x: 0,
    y: 0,
    radius: 1,
    style: {
        color: "red",
        thickness: 3
    }
};

const circle2 = {...circle1};
circle2.style = {...circle1.style};
const circle3 = JSON.parse(JSON.stringify(circle1));
circle1.radius++;
circle2.radius++;
circle3.radius++;
console.log(circle1.radius);
console.log(circle2.radius);
console.log(circle3.radius);
circle1.style.thickness++;
circle2.style.thickness++;
circle3.style.thickness++;
console.log(circle1.style.thickness);
console.log(circle2.style.thickness);
console.log(circle3.style.thickness);
