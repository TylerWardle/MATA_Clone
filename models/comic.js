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
            title: String,
            authorUsername: String,
            publicationDate: String,
            description: String,
            genre: String,
            toPublish: Boolean
        });
        this.comic = this.mongoose.model('Comic', this.comicSchema);
    }
    // INSERT **WORKS**
    // an _id that we use as ComicID is auto-generated when we insert a new comic object into the DB
    // we pass this id back to the client
    Comic.prototype.insert = function (_title, _authorUsername, _publicationDate, _description, _genre, _toPublish, callback) {
        var db = this.mongoose.connection;
        // create a new comic object with the client given data fields
        var c = new this.comic({
            title: _title,
            authorUsername: _authorUsername,
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
    // GET **WORKS**
    // we use the comicID to retrieve a comic from the DB
    Comic.prototype.getByID = function (_comicID, callback) {
        var db = this.mongoose.connection;
        var comicModel = this.comic;
        comicModel.findById({ _id: _comicID }, function (err, doc) {
            if (err)
                return console.error(err);
            // pass back the retrieved comic object to the client
            callback(doc);
        });
    };
    // GETALL **WORKS**
    // we get every comic record in the collection
    Comic.prototype.getAll = function (callback) {
        var db = this.mongoose.connection;
        var comicModel = this.comic;
        comicModel.find({}, function (err, docs) {
            if (err)
                return console.error(err);
            callback(docs);
        });
    };
    // UPDATE **WORKS**
    Comic.prototype.update = function (_comicID, _title, _authorUsername, _publicationDate, _description, _genre, _toPublish, callback) {
        var db = this.mongoose.connection;
        var comicModel = this.comic;
        var a_comic = new this.comic({
            title: _title,
            authorUsername: _authorUsername,
            publicationDate: _publicationDate,
            description: _description,
            genre: _genre,
            toPublish: _toPublish
        });
        var comicData = a_comic.toObject();
        delete comicData._id; // rid of mongoose error of updating id
        comicModel.update({ _id: _comicID }, comicData, { multi: false }, function (err, doc) {
            if (err)
                return console.error(err);
            callback();
        });
    };
    // DELETE **WORKS **
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