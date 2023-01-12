function fun(x, y, z) {
    if (arguments.length !== 3)
        throw "You must provide exactly three parameters.";
/*    x = x || 10;
    y = y || 20;
    z = z || 30;*/
    return x * y + z;
}

//console.log(fun())
//console.log(fun(42))
//console.log(fun(42,10))
console.log(fun(42,10,5))
//console.log(fun(42,10,5,108))
//console.log(fun(42,10,5,108,549))