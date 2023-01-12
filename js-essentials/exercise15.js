function fun() { // synchronous -> blocking
    if (Math.random() < 0.5)
        throw "Oooppps...";
    return 42;
}

/*const result = fun();
console.log(`result: ${result}`);*/

function gun() { // asynchronous -> non-blocking
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if (Math.random() < 0.5)
                reject("Oooppps...");
            resolve(42);
        },5_000);
    });
}

console.log("Application is just started...")
gun().then(result => console.log(`result: ${result}`))
    .catch(error => console.error(error))
    .finally(()=>console.log("Finally always run!"))
console.log("Application is done...")



