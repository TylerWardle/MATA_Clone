///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

export class ComicCell {
    private comicID: number;
    private img: string;
    private imgSeqNum: number;

    constructor(comicID: number, img: string, imgSeqNum: number) {
        this.comicID = comicID;
        this.img= img;
        this.imgSeqNum = imgSeqNum;
    }

    getComicID(): number {
        return this.comicID;
    }

    getImage(): string {
        return this.img;
    }

    getImgSeqNum(): number {
        return this.imgSeqNum;
    }

}

