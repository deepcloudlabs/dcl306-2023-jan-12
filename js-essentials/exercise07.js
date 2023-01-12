// Functional Programming
// 1. HoF (Higher-Order Function)
// 2. Pure Function
const numbers = [4, 8, 15, 16, 23, 42];
console.log(numbers);
numbers.sort((a, b) => b - a);
console.log(numbers);
// lambda expression, arrow function
numbers.sort((a, b) => a - b);
console.log(numbers);
