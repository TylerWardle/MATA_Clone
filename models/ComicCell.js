// A callback function is passed in as a parameter for every method to make operations in mongoose synchronous
<<<<<<< HEAD
/* HELPER CALLBACK METHODS FOR DELETE
var getOwnerID = (ownerID: String): any => {
    return ownerID;
}

var getContributorID = (contributorID: String): any =>  {
    return contributorID;
}
*/
var ComicCell = (function () {
    // intializing a comicCell object establishes a DB connection
    function ComicCell() {
        this.mongoose = require('mongoose');
        this.mongoose.connect('mongodb://localhost/MATA');
=======
var ComicCell = (function () {
    // intializing a comicCell object establishes a DB connection
    function ComicCell(mongoose) {
        this.mongoose = mongoose;
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
        this.schema = this.mongoose.Schema;
        // define ComicCell Object schema for storing Comic data fields
        this.comicCellSchema = new this.schema({
            comicID: String,
<<<<<<< HEAD
            ownerID: String,
            contributorID: String,
            toPublish: Boolean
        });
        this.comicCell = this.mongoose.model('ComicCell', this.comicCellSchema);
    }
    // INSERT
    // an _id that we use as ComicID is auto-generated when we insert a new comic object into the DB
    // we pass this id back to the client
    ComicCell.prototype.insert = function (_comicID, _ownerID, _contributorID, _toPublish, callback) {
        var db = this.mongoose.connection;
        // create a new comicCell object with the client-given data fields
        var cc = new this.comicCell({
            comicID: _comicID,
            ownerID: _ownerID,
            contributorID: _contributorID,
=======
            ownerUsername: String,
            collaboratorUsername: String,
            toPublish: Boolean
        });
        if (ComicCell.comicCell == null) {
            ComicCell.comicCell = this.mongoose.model('ComicCell', this.comicCellSchema);
        }
    }
    // INSERT **WORKS**
    // an _id that we use as ComicID is auto-generated when we insert a new comic object into the DB
    // we pass this id back to the client
    ComicCell.prototype.insert = function (_comicID, _ownerUsername, _collaboratorUsername, _toPublish, callback) {
        var db = this.mongoose.connection;
        // create a new comicCell object with the client-given data fields
        var cc = new ComicCell.comicCell({
            comicID: _comicID,
            ownerUsername: _ownerUsername,
            collaboratorUsername: _collaboratorUsername,
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
            toPublish: _toPublish
        });
        // insert the new comic obj into the DB
        cc.save(function (err, doc) {
            if (err)
                return console.error(err);
            // pass back the ComicID after the save function is done executing
            callback(doc._id.toString());
        });
    };
<<<<<<< HEAD
    // GET one comicCell
    ComicCell.prototype.get = function (_comicCellID, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = this.comicCell;
        // find all the comicCells associated with a single comicID
        comicCellModel.findOne({ 'comicCellID': _comicCellID }, function (err, doc) {
            if (err)
                return console.error(err);
            // pass back the retrieved comic object to the client
            callback(doc);
        });
    };
    // GET all comicCells associated with a comic
    ComicCell.prototype.getAll = function (_comicCellID, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = this.comicCell;
        // find all the comicCells associated with a single comicID
        comicCellModel.find({ 'comicCellID': _comicCellID }, function (err, docs) {
=======
    // GET ONE comicCell by quering by cell's ID **WORKS**
    ComicCell.prototype.get = function (_comicCellID, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = ComicCell.comicCell;
        // find all the comicCells associated with a single comicID
        comicCellModel.findById({ _id: _comicCellID }, function (err, doc) {
            if (err)
                return console.error(err);
            // pass back the retrieved comic cell object to the client
            callback(doc);
        });
    };
    // GET all comicCells associated with a comic **WORKS**
    ComicCell.prototype.getAll = function (_comicID, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = ComicCell.comicCell;
        // find all the comicCells associated with a single comicID
        comicCellModel.find({ 'comicID': _comicID }, function (err, docs) {
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
            if (err)
                return console.error(err);
            // pass back the retrieved comic object to the client
            callback(docs);
        });
    };
<<<<<<< HEAD
    // UPDATE
    // NOTE: the contributor ID field identifies the contributor who is calling the update method
    ComicCell.prototype.update = function (_comicCellID, a_comicCell, _contributorID, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = this.comicCell;
        // can update if the contributor is either the OWNER of the COMIC or a COLLABORATOR who owns the COMICCELL
        if (_contributorID == a_comicCell.ownerID || _contributorID == a_comicCell.contributorID) {
            comicCellModel.update({ _id: _comicCellID }, a_comicCell, function (err, doc) {
                if (err)
                    return console.error(err);
                callback(null);
            });
        }
        else {
            callback("ERROR: unauthorized to update comic cell!");
        }
    };
    return ComicCell;
})();
exports.ComicCell = ComicCell;
//# sourceMappingURL=ComicCell.js.map
=======
    // DELETE one comic cell **WORKS**
    ComicCell.prototype.delete = function (_comicCellID, _contributorUsername, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = ComicCell.comicCell;
        comicCellModel.findById({ _id: _comicCellID }, function (err, doc) {
            if (err)
                return console.error(err);
            var ownerUsername = doc.ownerUsername;
            var collaboratorUsername = doc.collaboratorUsername;
            // can delete only if the contributor is either the OWNER of the COMIC or a COLLABORATOR who owns the COMICCELL
            if (_contributorUsername == ownerUsername || _contributorUsername == collaboratorUsername) {
                comicCellModel.remove({ _id: _comicCellID }, function (err, doc) {
                    if (err)
                        return console.error(err);
                    callback();
                });
            }
            else {
                console.log("User not authorized to delete comic cell.");
            }
        });
    };
    // DELETE ALL comic cells associated with the same comic **WORKS**
    ComicCell.prototype.deleteAll = function (_comicID, _contributorUsername, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = ComicCell.comicCell;
        // get one comic cell to retrieve the ownerUsername of that cell. Assume same ownerUsername for the same ComicID
        comicCellModel.findOne({ 'comicID': _comicID }, function (err, doc) {
            if (err)
                return console.error(err);
            var ownerUsername = doc.ownerUsername;
            // can delete only if the contributor is the OWNER of the COMIC
            if (_contributorUsername == ownerUsername) {
                comicCellModel.remove({ 'comicID': _comicID }, function (err, doc) {
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
    ComicCell.comicCell = null; // static class variable
    return ComicCell;
})();
exports.ComicCell = ComicCell;
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
