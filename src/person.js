class Person {
    constructor(name = "noname", age = 30) {
        this.name = name;
        this.age = age;
    }

    toJSON() {
        const { name, age } = this;
        return { name, age }
    }
}

module.exports = Person;