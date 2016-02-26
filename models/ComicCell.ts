// A callback function is passed in as a parameter for every method to make operations in mongoose synchronous

/* HELPER CALLBACK METHODS FOR DELETE
var getOwnerID = (ownerID: String): any => {
    return ownerID;
}

var getCollaboratorID = (collaboratorID: String): any =>  {
    return collaboratorID;
}
*/

export class ComicCell {

    // class variables
    mongoose: any;
    schema: any;
    comicCellSchema: any;
    comicCell: any;

    // intializing a comicCell object establishes a DB connection
    constructor() {
        this.mongoose = require('mongoose');
        this.mongoose.connect('mongodb://localhost/MATA');
        this.schema = this.mongoose.Schema;

        // define ComicCell Object schema for storing Comic data fields
        this.comicCellSchema = new this.schema({  // NOTE* comicCellID is implicity generated by DB service at time of document creation (attribute is "_id")
            comicID: String, // the Comic that the image or "cell" is associated with
            ownerID: String, // NOTE* OWNER of the COMIC can delete all associated comic cells
            collaboratorID: String, // NOTE* COLLABORATOR TO the COMIC can own delete cells he/she created
            toPublish: Boolean
        });

        this.comicCell = this.mongoose.model('ComicCell', this.comicCellSchema);
    }

    // INSERT
    // an _id that we use as ComicID is auto-generated when we insert a new comic object into the DB
    // we pass this id back to the client
    insert(_comicID: String, _ownerID: String, _collaboratorID: String, _toPublish: Boolean, callback: Function): any {
        var db = this.mongoose.connection;

        // create a new comicCell object with the client-given data fields
        var cc = new this.comicCell({
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
    }

    // GET one comicCell
    get(_comicCellID: String, callback: Function): any {
        var db = this.mongoose.connection;
        var comicCellModel = this.comicCell;

        // find all the comicCells associated with a single comicID
        comicCellModel.findOne({ 'comicCellID': _comicCellID }, function (err, doc) {
            if (err)
                return console.error(err);
            // pass back the retrieved comic object to the client
            callback(doc);
        });

    }

    // GET all comicCells associated with a comic
    getAll(_comicCellID: String, callback: Function): any {
        var db = this.mongoose.connection;
        var comicCellModel = this.comicCell;

        // find all the comicCells associated with a single comicID
        comicCellModel.find({ 'comicCellID': _comicCellID }, function (err, docs) {
            if (err)
                return console.error(err);
            // pass back the retrieved comic object to the client
            callback(docs);
        });

    }

    // UPDATE
    // NOTE: the collaborator ID field identifies the collaborator who is calling the update method
    update(_comicCellID: String, _comicID: String, _ownerID: String, _collaboratorID: String, _toPublish: Boolean, callback: Function): any {
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
        } else {
            callback("ERROR: unauthorized to update comic cell!");
        }
    }

    /* TODO: implement delete for sprint 2
    // partial code below
         
    // DELETE one comic cell
    deleteOne(_comicID: String, _comicCellID: String, _collaboratorID: String, callback: Function): void {
        var db = this.mongoose.connection;
        var comicCellModel = this.comicCell;

        var ownerID, collaboratorID;

        comicCellModel.findById({ _id: _comicCellID }, function (err, doc) {
            if (err)
                return console.error(err);
            ownerID = getOwnerID(doc.ownerID.toString());
            collaboratorID = getCollaboratorID(doc.collaboratorID.toString());
        });

        // can delete only if the collaborator is either the OWNER of the COMIC or a COLLABORATOR who owns the COMICCELL
        if (_collaboratorID == ownerID || _collaboratorID == collaboratorID) {
            comicCellModel.remove({ _id: _comicID }, function (err, doc) {
                if (err)
                    return console.error(err);
                callback();
            });
        }

    }

    //deleteAll()
    */
}
