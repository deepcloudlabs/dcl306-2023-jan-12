const numbers = [4, 8, 15, 16, 23, 42];
let sum = 0;
for (const number of numbers) {
    if (number % 2 === 0) {
        const cubed = number ** 3;
        sum += cubed;
    }
}
console.log(`sum is ${sum}.`); // 78760
const if_even = n => {
    console.log(`if_even(${n})`);
    return n % 2 === 0;
}
const to_cube = u => {
    console.log(`to_cube(${u})`);
    return u ** 3;
};
const to_sum = (acc, v) => {
    console.log(`to_sum(${acc},${v})`);
    return acc + v;
}
sum = numbers.filter(if_even)
    .map(to_cube)
    .reduce(to_sum, 0);
console.log(`sum is ${sum}.`); // 78760
