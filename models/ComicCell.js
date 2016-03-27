// A callback function is passed in as a parameter for every method to make operations in mongoose synchronous
"use strict";
var ComicCell = (function () {
    // intializing a comicCell object establishes a DB connection
    function ComicCell(mongoose) {
        this.mongoose = mongoose;
        this.schema = this.mongoose.Schema;
        // define ComicCell Object schema for storing Comic data fields
        this.comicCellSchema = new this.schema({
            comicID: String,
            ownerID: String,
            collaboratorID: String,
            toPublish: Boolean
        });
        if (ComicCell.comicCell == null) {
            ComicCell.comicCell = this.mongoose.model('ComicCell', this.comicCellSchema);
        }
    }
    // INSERT 
    // an _id that we use as ComicID is auto-generated when we insert a new comic object into the DB
    // we pass this id back to the client
    ComicCell.prototype.insert = function (_comicID, _ownerID, _collaboratorID, _toPublish, callback) {
        var db = this.mongoose.connection;
        // create a new comicCell object with the client-given data fields
        var cc = new ComicCell.comicCell({
            comicID: _comicID,
            ownerID: _ownerID,
            collaboratorID: _collaboratorID,
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
    // GET ONE comicCell by quering by cell's ID 
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
    // GET ONE comicCell by quering by cell's ID 
    ComicCell.prototype.getRepresentative = function (_comicID, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = ComicCell.comicCell;
        // find all the comicCells associated with a single comicID
        comicCellModel.findOne({ comicID: _comicID.toString() }, function (err, doc) {
            if (err)
                return console.error(err);
            // pass back the retrieved comic cell object to the client
            callback(doc);
        });
    };
    // GET all comicCells associated with a comic 
    ComicCell.prototype.getAll = function (_comicID, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = ComicCell.comicCell;
        // find all the comicCells associated with a single comicID
        comicCellModel.find({ 'comicID': _comicID }, function (err, docs) {
            if (err)
                return console.error(err);
            // pass back the retrieved comic object to the client
            callback(docs);
        });
    };
    // DELETE one comic cell 
    ComicCell.prototype.delete = function (_comicCellID, _contributorID, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = ComicCell.comicCell;
        comicCellModel.findById({ _id: _comicCellID }, function (err, doc) {
            if (err)
                return console.error(err);
            var ownerID = doc.ownerID;
            var collaboratorID = doc.collaboratorID;
            // can delete only if the contributor is either the OWNER of the COMIC or a COLLABORATOR who owns the COMICCELL
            if (_contributorID == ownerID || _contributorID == collaboratorID) {
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
    // DELETE ALL comic cells associated with the same comic 
    ComicCell.prototype.deleteAll = function (_comicID, _contributorID, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = ComicCell.comicCell;
        // get one comic cell to retrieve the ownerID of that cell. Assume same ownerID for the same ComicID
        comicCellModel.findOne({ 'comicID': _comicID }, function (err, doc) {
            if (err)
                return console.error(err);
            var ownerID = doc.ownerID;
            // can delete only if the contributor is the OWNER of the COMIC
            if (_contributorID == ownerID) {
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
    ComicCell.prototype.getRepresentativeImagesBody = function (comicIDs, index, imageHeader, comicCellIDArr, callback) {
        var _this = this;
        this.getRepresentative(comicIDs[index], function (doc) {
            comicCellIDArr.push(imageHeader + doc._id);
            if (index == comicIDs.length - 1)
                callback(comicCellIDArr);
            else
                _this.getRepresentativeImagesBody(comicIDs, index + 1, imageHeader, comicCellIDArr, callback);
        });
    };
    // given a list of comic IDs, return a list of image links each associated with the respective comicID 
    ComicCell.prototype.getRepresentativeImages = function (comicIDs, imageHeader, callback) {
        var db = this.mongoose.connection;
        var comicCellModel = ComicCell.comicCell;
        var comicCellIDArr = new Array();
        this.getRepresentativeImagesBody(comicIDs, 0, imageHeader, comicCellIDArr, callback);
    };
    ComicCell.comicCell = null; // static class variable
    return ComicCell;
}());
exports.ComicCell = ComicCell;
