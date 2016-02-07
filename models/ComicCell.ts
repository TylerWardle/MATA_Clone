///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

export class ComicCell {
    private comicID: number;
    private img: string;

    constructor(comicID: number, img: string) {
        this.comicID = comicID;
        this.img= img;
    }

    getComicID(): number {
        return this.comicID;
    }

    getImage(): string {
        return this.img;
    }
}

