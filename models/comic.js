// A callback function is passed in as a parameter for every method to make operations in mongoose synchronous
var Comic = (function () {
    // intializing a comic object establishes a DB connection
    function Comic(mongoose) {
        this.mongoose = mongoose;
        this.schema = this.mongoose.Schema;
        // define Comic Object schema for storing Comic data fields
        this.comicSchema = new this.schema({
            title: String,
            normalized_title: String,
            authorID: String,
            authorUsername: String,
            normalized_authorUsername: String,
            publicationDate: Date,
            description: String,
            genre: String,
            toPublish: Boolean,
            openToContribution: Boolean,
            thumbnailID: String
        });
        if (Comic.comic == null) {
            Comic.comic = this.mongoose.model('Comic', this.comicSchema);
        }
    }
    // INSERT 
    // an _id that we use as ComicID is auto-generated when we insert a new comic object into the DB.
    // NOTE: "un" stands for unnormalized
    Comic.prototype.insert = function (_title, _authorID, _authorUsername, _description, _genre, _toPublish, _openToContribution, _thumbnailID, callback) {
        var db = this.mongoose.connection;
        var _publicationDate = null;
        if (_toPublish == true)
            _publicationDate = new Date();
        // create a new comic object with the client given data fields
        var c = new Comic.comic({
            title: _title,
            normalized_title: _title.toLowerCase(),
            authorID: _authorID,
            authorUsername: _authorUsername,
            normalized_authorUsername: _authorUsername.toLowerCase(),
            publicationDate: _publicationDate,
            description: _description,
            genre: _genre,
            toPublish: _toPublish,
            openToContribution: _openToContribution,
            thumbnailID: _thumbnailID
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
    // we use the comicID to retrieve a comic from the DB
    Comic.prototype.get = function (_comicID, callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        comicModel.findById({ _id: _comicID }, function (err, doc) {
            if (err)
                return console.error(err);
            // pass back the retrieved comic object to the client
            callback(doc);
        });
    };
    // GETALL 
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
    // UPDATE 
    Comic.prototype.update = function (_comicID, _title, _authorID, _authorUsername, _publicationDate, _description, _genre, _toPublish, _openToContribution, _thumbnailID, callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        var usablePublicationDate = _publicationDate;
        if (_toPublish == true)
            usablePublicationDate = new Date();
        var a_comic = new Comic.comic({
            title: _title,
            normalized_title: _title.toLowerCase(),
            authorID: _authorID,
            authorUsername: _authorUsername,
            normalized_authorUsername: _authorUsername.toLowerCase(),
            publicationDate: usablePublicationDate,
            description: _description,
            genre: _genre,
            toPublish: _toPublish,
            thumbnailID: _thumbnailID,
            openToContribution: _openToContribution
        });
        var comicData = a_comic.toObject();
        delete comicData._id; // rid of mongoose error of updating id
        comicModel.update({ _id: _comicID }, comicData, { multi: false }, function (err, doc) {
            if (err)
                return console.error(err);
            callback();
        });
    };
    // DELETE 
    Comic.prototype.delete = function (_comicID, _contributorID, callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        // retrieve the authorID of the comic.
        comicModel.findById({ _id: _comicID }, function (err, doc) {
            if (err)
                return console.error(err);
            var authorID = doc.authorID;
            // can delete only if the contributor is the OWNER of the COMIC
            if (_contributorID == authorID) {
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
    };
    Comic.comic = null; // static class variable
    return Comic;
})();
exports.Comic = Comic;
