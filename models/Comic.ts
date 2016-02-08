///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

export class Comic {
    private comicID: string;
    private title: string;
    private author_username: string;    // for publishing credit purposes
    private author_ID: string;          // for internal storing ownership purposes
    private publicationDate: string;
    private description: string;
    private genre: string;
    private toPublish: boolean;
    
    constructor(comicID: string, title: string, author_username: string, author_ID: string, publicationDate: string, description: string, genre: string, toPublish: boolean) {
        this.comicID = comicID;
        this.title = title;
        this.author_username = author_username;
        this.author_ID = author_ID;
        this.publicationDate = publicationDate;
        this.description = description;
        this.genre = genre;
        this.toPublish = toPublish;
    }

    getComicID(): string {
        return this.comicID;
    }

    getTitle(): string {
        return this.title;
    }

    getAuthorUsername(): string {
        return this.author_username;
    }

    getAuthorID(): string {
        return this.author_ID;
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

