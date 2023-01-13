class Employee {
    constructor(identity, fullname, salary, iban) {
        this.identity = identity;
        this.fullname = fullname;
        this.salary = salary;
        this.iban = iban;
        //this.sayHello = this.sayHello.bind(this);
    }

    sayHello = () => {
        console.log(this);
        console.log(`Hello, ${this.fullname}!`);
    }
}

const kate = new Employee("11111111110", "kate austen", 100_000, "tr1");

kate.sayHello();

setInterval( kate.sayHello , 5_000)