class Employee { // base class, super class
    constructor(identity,fullname,salary,iban) {
        this.identity = identity;
        this.fullname = fullname;
        this.salary = salary;
        this.iban = iban;
    }
}

class Developer extends Employee { // derived class, sub-class
    constructor(identity,fullname,salary,iban,languages) {
        super(identity,fullname,salary,iban);
        this.languages = languages;
    }
}