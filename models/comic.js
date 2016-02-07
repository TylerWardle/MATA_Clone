///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var Comic = (function () {
    function Comic(comicID, title, author, description, genre, toPublish) {
        this.comicID = comicID;
        this.title = title;
        this.author = author;
        this.description = description;
        this.genre = genre;
        this.toPublish = toPublish;
    }
    Comic.prototype.getComicID = function () {
        return this.comicID;
    };
    Comic.prototype.getTitle = function () {
        return this.title;
    };
    Comic.prototype.getAuthor = function () {
        return this.author;
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
