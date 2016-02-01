/// <reference path='..\types\DefinitelyTyped\node\node.d.ts'/>

/// <reference path='..\types\DefinitelyTyped\express\express.d.ts'/>

interface UserInterface {

    getName(): string;
    getEmail(): string;

}

class User implements UserInterface {
    private name: string;
    private email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }
}
