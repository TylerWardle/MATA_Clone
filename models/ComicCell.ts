///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

export class ComicCell {
    private comicID: string;
    private img: string;

    constructor(comicID: string, img: string) {
        this.comicID = comicID;
        this.img= img;
    }

    getComicID(): string {
        return this.comicID;
    }

    getImage(): string {
        return this.img;
    }
}

