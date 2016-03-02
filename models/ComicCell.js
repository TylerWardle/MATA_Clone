// A callback function is passed in as a parameter for every method to make operations in mongoose synchronous
/* HELPER CALLBACK METHODS FOR DELETE
var getOwnerID = (ownerID: String): any => {
    return ownerID;
}

var getCollaboratorID = (collaboratorID: String): any =>  {
    return collaboratorID;
}
*/
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
    // GET one comicCell by quering by cell's ID
    ComicCell.prototype.getByID = function (_comicCellID, callback) {
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
    // GET all comicCells associated with a comic
    ComicCell.prototype.getAll = function (_comicCellID, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = this.comicCell;
        // find all the comicCells associated with a single comicID
        comicCellModel.find({ 'comicCellID': _comicCellID }, function (err, docs) {
            if (err)
                return console.error(err);
            // pass back the retrieved comic object to the client
            callback(docs);
        });
    };
    // UPDATE **CHANGE OWNER AND COLLABORATOR ID TO USERNAME
    // NOTE: the collaborator ID field identifies the collaborator who is calling the update method
    ComicCell.prototype.update = function (_comicCellID, _comicID, _ownerID, _collaboratorID, _toPublish, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = this.comicCell;
        var a_comicCell = new this.comicCell({
            comicID: _comicID,
            ownerID: _ownerID,
            collaboratorID: _collaboratorID,
            toPublish: _toPublish
        });
        // can update if the collaborator is either the OWNER of the COMIC or a COLLABORATOR who owns the COMICCELL
        if (_collaboratorID == _ownerID || _collaboratorID == _collaboratorID) {
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