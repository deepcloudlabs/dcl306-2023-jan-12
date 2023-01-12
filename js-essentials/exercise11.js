const numbers = [4, 8, 15, 16, 23, 42];
let sum = 0;
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
function* filter(arr, predicate_fun){ // generator function
    for (const element of arr){
        if(predicate_fun(element))
            yield element;
    }
}

function* map(arr, mapper_fun){ // generator function
    for (const element of arr){
         yield mapper_fun(element);
    }
}
function reduce(arr, reducer_fun, init_value){ // generator function
    let result =  init_value;
    for (const element of arr){
         result = reducer_fun(result,element);
    }
    return result;
}

sum = reduce(map(filter(numbers,if_even),to_cube), to_sum, 0);
console.log(`sum is ${sum}.`); // 78760