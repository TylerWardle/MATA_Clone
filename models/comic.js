///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var Comic = (function () {
    function Comic(comicID, authorID, title, author_username, publicationDate, description, genre, toPublish) {
        this.comicID = comicID;
        this.authorID = authorID;
        this.title = title;
        this.author_username = author_username;
        this.publicationDate = publicationDate;
        this.description = description;
        this.genre = genre;
        this.toPublish = toPublish;
    }
    Comic.prototype.getComicID = function () {
        return this.comicID;
    };
    Comic.prototype.getAuthorID = function () {
        return this.authorID;
    };
    Comic.prototype.getTitle = function () {
        return this.title;
    };
    Comic.prototype.getAuthorUsername = function () {
        return this.author_username;
    };
    Comic.prototype.getPublicationDate = function () {
        return this.publicationDate;
    };
    Comic.prototype.getDesription = function () {
        return this.description;
    };
    Comic.prototype.getGenre = function () {
        return this.genre;
    };
    Comic.prototype.getToPublish = function () {
        return this.toPublish;
    };
    return Comic;
})();
exports.Comic = Comic;
