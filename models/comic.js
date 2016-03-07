<<<<<<< HEAD
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
=======
// A callback function is passed in as a parameter for every method to make operations in mongoose synchronous
var Comic = (function () {
    // intializing a comic object establishes a DB connection
    function Comic(mongoose) {
        this.mongoose = mongoose;
        this.schema = this.mongoose.Schema;
        // define Comic Object schema for storing Comic data fields
        this.comicSchema = new this.schema({
            title: String,
            authorUsername: String,
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
            publicationDate: String,
            description: String,
            genre: String,
            toPublish: Boolean
        });
<<<<<<< HEAD
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
=======
        if (Comic.comic == null) {
            Comic.comic = this.mongoose.model('Comic', this.comicSchema);
        }
    }
    // INSERT **WORKS**
    // an _id that we use as ComicID is auto-generated when we insert a new comic object into the DB
    // we pass this id back to the client
    Comic.prototype.insert = function (_title, _authorUsername, _publicationDate, _description, _genre, _toPublish, callback) {
        var db = this.mongoose.connection;
        // create a new comic object with the client given data fields
        var c = new Comic.comic({
            title: _title,
            authorUsername: _authorUsername,
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
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
<<<<<<< HEAD
    // GET
    // we use the comic identifier to retrieve a comic from the DB
    Comic.prototype.get = function (_comicID, callback) {
        var db = this.mongoose.connection;
        var comicModel = this.comic;
=======
    // GET **WORKS**
    // we use the comicID to retrieve a comic from the DB
    Comic.prototype.get = function (_comicID, callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
        comicModel.findById({ _id: _comicID }, function (err, doc) {
            if (err)
                return console.error(err);
            // pass back the retrieved comic object to the client
            callback(doc);
        });
    };
<<<<<<< HEAD
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
=======
    // GETALL **WORKS**
    // we get every comic record in the collection
    Comic.prototype.getAll = function (callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        comicModel.find({}, function (err, docs) {
            if (err)
                return console.error(err);
            callback(docs);
        });
    };
    // UPDATE **WORKS**
    Comic.prototype.update = function (_comicID, _title, _authorUsername, _publicationDate, _description, _genre, _toPublish, callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        var a_comic = new Comic.comic({
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
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
            if (err)
                return console.error(err);
            callback();
        });
<<<<<<< HEAD
=======
    };
    // DELETE **NEED TO BE TESTED **
    Comic.prototype.delete = function (_comicID, _contributorUsername, callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        // retrieve the authorUsername of the comic.
        comicModel.findById({ _id: _comicID }, function (err, doc) {
            if (err)
                return console.error(err);
            var authorUsername = doc.authorUsername;
            // can delete only if the contributor is the OWNER of the COMIC
            if (_contributorUsername == authorUsername) {
                comicModel.remove({ _id: _comicID }, function (err, doc) {
                    if (err)
                        return console.error(err);
                    callback();
                });
            }
            else {
                console.log("User not authorized to delete comic cells.");
            }
        });
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
    };
    Comic.comic = null; // static class variable
    return Comic;
})();
exports.Comic = Comic;
//# sourceMappingURL=Comic.js.map