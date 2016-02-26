// TODO:
// added a <list>contributor data field to Comic schema
// A callback function is passed in as a parameter for every method to make operations in mongoose synchronous
var Comic = (function () {
    // intializing a comic object establishes a DB connection
    function Comic() {
        this.mongoose = require('mongoose');
        this.mongoose.connect('mongodb://localhost/MATA');
        this.schema = this.mongoose.Schema;
        // define Comic Object schema for storing Comic data fields
        this.comicSchema = new this.schema({
            authorID: String,
            title: String,
            author_username: String,
            publicationDate: String,
            description: String,
            genre: String,
            toPublish: Boolean
        });
        this.comic = this.mongoose.model('Comic', this.comicSchema);
    }
    // INSERT
    // an _id that we use as ComicID is auto-generated when we insert a new comic object into the DB
    // we pass this id back to the client
    Comic.prototype.insert = function (_authorID, _title, _author_username, _publicationDate, _description, _genre, _toPublish, callback) {
        var db = this.mongoose.connection;
        // create a new comic object with the client given data fields
        var c = new this.comic({
            authorID: _authorID,
            title: _title,
            author_username: _author_username,
            publicationDate: _publicationDate,
            description: _description,
            genre: _genre,
            toPublish: _toPublish
        });
        // insert the new comic obj into the DB
        c.save(function (err, doc) {
            if (err)
                return console.error(err);
            // pass back the ComicID after the save function is done executing
            callback(doc._id.toString());
        });
    };
    // GET
    // we use the comic identifier to retrieve a comic from the DB
    Comic.prototype.get = function (_comicID, callback) {
        var db = this.mongoose.connection;
        var comicModel = this.comic;
        comicModel.findById({ _id: _comicID }, function (err, doc) {
            if (err)
                return console.error(err);
            // pass back the retrieved comic object to the client
            callback(doc);
        });
    };
    // UPDATE
    Comic.prototype.update = function (_comicID, a_comic, callback) {
        var db = this.mongoose.connection;
        var comicModel = this.comic;
        // create a new document if no Comic document with "_id = comicID" exists, otherwise update the existing document by replacing all fields with comicObj fields
        comicModel.update({ _id: _comicID }, a_comic, { upsert: true }, function (err, doc) {
            if (err)
                return console.error(err);
            callback();
        });
    };
    // DELETE 
    Comic.prototype.delete = function (_comicID, callback) {
        var db = this.mongoose.connection;
        var comicModel = this.comic;
        comicModel.remove({ _id: _comicID }, function (err, doc) {
            if (err)
                return console.error(err);
            callback();
        });
    };
    return Comic;
})();
exports.Comic = Comic;
//# sourceMappingURL=Comic.js.map