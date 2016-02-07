///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

export class Comic {
    private comicID: number;
    private title: string;
    private author: string;
    private publicationDate: string;
    private description: string;
    private genre: string;
    private toPublish: boolean;
    
    constructor(comicID: number, title: string, author: string, publicationDate: string, description: string, genre: string, toPublish: boolean) {
        this.comicID = comicID;
        this.title = title;
        this.author = author;
        this.publicationDate = publicationDate;
        this.description = description;
        this.genre = genre;
        this.toPublish = toPublish;
    }

    getComicID(): number {
        return this.comicID;
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }

    getPublicationDate(): string {
        return this.publicationDate;
    }

    getDesription(): string {
        return this.description;
    }

    getGenre(): string {
        return this.genre;
    }

    getToPublish(): boolean {
        return this.toPublish;
    }
}

