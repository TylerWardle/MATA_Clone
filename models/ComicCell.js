// A callback function is passed in as a parameter for every method to make operations in mongoose synchronous
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
        this.schema = this.mongoose.Schema;
        // define ComicCell Object schema for storing Comic data fields
        this.comicCellSchema = new this.schema({
            comicID: String,
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
            if (err)
                return console.error(err);
            // pass back the retrieved comic object to the client
            callback(docs);
        });
    };
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
