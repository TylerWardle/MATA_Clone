///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

export class User {
    private name: string;
    private password: string;
    private favorites: string[];

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
        this.favorites = new Array<string>();
    }

    getName(): string {
        return this.name;
    }

    getPassword(): string {
        return this.password;
    }
    
    getFavorites() : string[]{
        return this.favorites;
    }

    addFavorite(favorite:string){
        this.favorites.push(favorite);
    }
}


