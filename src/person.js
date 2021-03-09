class Person {
    constructor(name = "noname", age = 30) {
        this.name = name;
        this.age = age;
    }

    toJSON() {
        const { name, age } = this;  //name = this.name   age=this.age

        return { name, age }
    }
}

module.exports = Person;