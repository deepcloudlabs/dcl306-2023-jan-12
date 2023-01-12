const numbers = [4, 8, 15, 16, 23, 42];
// 1. External Loop #1
for (let i = 0; i < numbers.length; ++i) {
    const number = numbers[i];
    console.log(number);
}
// 2. External Loop #2
for (let i in numbers) {
    const number = numbers[i];
    console.log(number);
}
// 3. External Loop #3
for (let number of numbers) {
    console.log(number);
}
// 4. Internal Loop #1
numbers.forEach((number,i) => console.log(i, number)); // HoF