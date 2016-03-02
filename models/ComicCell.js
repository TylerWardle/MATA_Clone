// A callback function is passed in as a parameter for every method to make operations in mongoose synchronous
var ComicCell = (function () {
    // intializing a comicCell object establishes a DB connection
    function ComicCell() {
        this.mongoose = require('mongoose');
        this.mongoose.connect('mongodb://localhost/MATA');
        this.schema = this.mongoose.Schema;
        // define ComicCell Object schema for storing Comic data fields
        this.comicCellSchema = new this.schema({
            comicID: String,
            ownerUsername: String,
            collaboratorUsername: String,
            toPublish: Boolean
        });
        this.comicCell = this.mongoose.model('ComicCell', this.comicCellSchema);
    }
    // INSERT **WORKS**
    // an _id that we use as ComicID is auto-generated when we insert a new comic object into the DB
    // we pass this id back to the client
    ComicCell.prototype.insert = function (_comicID, _ownerUsername, _collaboratorUsername, _toPublish, callback) {
        var db = this.mongoose.connection;
        // create a new comicCell object with the client-given data fields
        var cc = new this.comicCell({
            comicID: _comicID,
            ownerUsername: _ownerUsername,
            collaboratorUsername: _collaboratorUsername,
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
    // GET ONE comicCell by quering by cell's ID **WORKS**
    ComicCell.prototype.get = function (_comicCellID, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = this.comicCell;
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
        var comicCellModel = this.comicCell;
        // find all the comicCells associated with a single comicID
        comicCellModel.find({ 'comicID': _comicID }, function (err, docs) {
            if (err)
                return console.error(err);
            // pass back the retrieved comic object to the client
            callback(docs);
        });
    };
    // UPDATE **MAY NOT BE NEEDED **
    // NOTE: the collaborator ID field identifies the collaborator who is calling the update method
    /*
    update(_comicCellID: String, _comicID: String, _ownerUsername: String, _collaboratorUsername: String, _toPublish: Boolean, callback: Function): any {
        var db = this.mongoose.connection;
        var comicCellModel = this.comicCell;
        
        var a_comicCell = new this.comicCell({
            comicID: _comicID,
            ownerUsername: _ownerUsername,
            collaboratorUsername: _collaboratorUsername,
            toPublish: _toPublish
        });
        
        // get the username of the collaborator on this comic cell
        // encapsulated rest of update method in this function's callback method for synchronous code execution
        comicCellModel.findById({ _id: _comicCellID }, function (err, doc) {
            if (err)
                return console.error(err);
            var collaboratorUsername = doc.collaboratorUsername;
            
            // can update if the collaborator is either the OWNER of the COMIC or a COLLABORATOR who owns the COMICCELL
            if (_collaboratorUsername == _ownerUsername || _collaboratorUsername == collaboratorUsername) {
                var comicCellData = a_comicCell.toObject();
                delete comicCellData._id; // rid of mongoose error of updating id
                comicCellModel.update({ _id: _comicCellID }, comicCellData, { multi: false }, function (err, doc) {
                    if (err)
                        return console.error(err);
                    callback();
                });
            } else {
                console.log("User not authorized to edit comic cell.");
            }
        });
    }
    */
    // DELETE one comic cell
    ComicCell.prototype.delete = function (_comicCellID, comicID, _contributorUsername, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = this.comicCell;
        var ownerID, collaboratorID;
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
        });
    };
    // DELETE ALL comic cells associated with the same comic
    ComicCell.prototype.deleteAll = function () { };
    return ComicCell;
})();
exports.ComicCell = ComicCell;
//# sourceMappingURL=ComicCell.js.map