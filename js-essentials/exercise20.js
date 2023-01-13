function createSecret(level) {
    const digits = [];
    digits.push(createRandomDigit(1, 9));
    while (digits.length < level) {
        const digit = createRandomDigit(0, 9);
        if (digits.includes(digit)) continue;
        digits.push(digit);
    }
    return digits.join('');
}

function createRandomDigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

new Array(100).fill(1)
                       .forEach(i =>console.log(createSecret(8)));
