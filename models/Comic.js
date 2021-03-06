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
            publicationDate: { type: Date, default: Date.now },
            description: String,
            genre: String,
            toPublish: Boolean,
            openToContribution: Boolean,
            openToCommenting: Boolean,
            thumbnailID: String,
            upvotes: Number,
            votedPpl: [{ id: String, votetype: Number }],
            fave: [String]
        });
        if (Comic.comic == null) {
            Comic.comic = this.mongoose.model('Comic', this.comicSchema);
        }
    }
    // INSERT 
    // an _id that we use as ComicID is auto-generated when we insert a new comic object into the DB.
    // NOTE: "un" stands for unnormalized
    Comic.prototype.insert = function (_title, _authorID, _authorUsername, _description, _genre, _toPublish, _openToContribution, _openToCommenting, _thumbnailID, _upvotes, _votedPpl, _fave, callback) {
        var db = this.mongoose.connection;
        var _publicationDate = new Date();
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
            openToCommenting: _openToCommenting,
            thumbnailID: _thumbnailID,
            upvotes: _upvotes,
            votedPpl: _votedPpl,
            fave: _fave
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
    Comic.prototype.update = function (_comicID, _title, _authorID, _authorUsername, _publicationDate, _description, _genre, _toPublish, _openToContribution, _openToCommenting, _thumbnailID, _upvotes, _votedPpl, _fave, callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        var _publicationDate = new Date();
        var a_comic = new Comic.comic({
            title: _title,
            normalized_title: _title.toLowerCase(),
            authorID: _authorID,
            authorUsername: _authorUsername,
            normalized_authorUsername: _authorUsername.toLowerCase(),
            publicationDate: _publicationDate,
            description: _description,
            genre: _genre,
            toPublish: _toPublish,
            thumbnailID: _thumbnailID,
            openToContribution: _openToContribution,
            openToCommenting: _openToCommenting,
            upvotes: _upvotes,
            votedPpl: _votedPpl,
            fave: _fave
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
    Comic.prototype.getComicsSortedByTitle = function (callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        // use normalized_title field of comic model to get alphabetically sorted titles 
        comicModel.aggregate([
            { $sort: { normalized_title: 1 } }
        ], function (err, docs) {
            callback(docs);
        });
    };
    Comic.prototype.getComicsSortedByAuthor = function (callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        // use normalized_author field of comic model to get alphabetically sorted authors 
        comicModel.aggregate([
            { $sort: { normalized_authorUsername: 1 } }
        ], function (err, docs) {
            callback(docs);
        });
    };
    Comic.prototype.getComicsSortedByMostRecentlyPublished = function (callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        comicModel.aggregate([
            { $sort: { publicationDate: -1 } }
        ], function (err, docs) {
            callback(docs);
        });
    };
    Comic.prototype.getComicsSortedByLeastRecentlyPublished = function (callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        comicModel.aggregate([
            { $sort: { publicationDate: 1 } }
        ], function (err, docs) {
            callback(docs);
        });
    };
    Comic.prototype.getZombiesComics = function (callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        comicModel.find({ 'genre': "zombies" }, function (err, docs) {
            callback(docs);
        });
    };
    Comic.prototype.getPostApocalypticComics = function (callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        comicModel.find({ 'genre': "post apocalyptic" }, function (err, docs) {
            callback(docs);
        });
    };
    Comic.prototype.getActionAdventureComics = function (callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        comicModel.find({ 'genre': "action/adventure" }, function (err, docs) {
            callback(docs);
        });
    };
    Comic.prototype.getHumorComics = function (callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        comicModel.find({ 'genre': "humor" }, function (err, docs) {
            callback(docs);
        });
    };
    Comic.prototype.getSuperheroComics = function (callback) {
        var db = this.mongoose.connection;
        var comicModel = Comic.comic;
        comicModel.find({ 'genre': "superhero" }, function (err, docs) {
            callback(docs);
        });
    };
    // given a list of comic objects, return a list of comic links to published comics
    Comic.prototype.extractPublishedComicIDs = function (comicObjs, callback) {
        var numOfComicIDs = 0;
        var comicIDArr = new Array();
        for (var i = 0; i < comicObjs.length; i++) {
            if (comicObjs[i].toPublish) {
                comicIDArr.push(comicObjs[i]._id);
                numOfComicIDs++;
            }
        }
        callback(comicIDArr);
    };
    Comic.comic = null; // static class variable
    return Comic;
})();
exports.Comic = Comic;
