async function gun() { // asynchronous -> non-blocking
    if (Math.random() < 0.5)
        throw "Oooppps...";
    return 42;
}

console.log("Application is just started...")
gun().then(result => console.log(`result: ${result}`))
    .catch(error => console.error(error))
    .finally(() => console.log("Finally always run!"))
console.log("Application is done...")



