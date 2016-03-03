// A callback function is passed in as a parameter for every method to make operations in mongoose synchronous

export class ComicCell {

    // class variables
    mongoose: any;
    schema: any;
    comicCellSchema: any;
    static comicCell: any = null; // static class variable

    // intializing a comicCell object establishes a DB connection
    constructor(mongoose: any) {
        this.mongoose = mongoose;
        this.schema = this.mongoose.Schema;

        // define ComicCell Object schema for storing Comic data fields
        this.comicCellSchema = new this.schema({  // NOTE* comicCellID is implicity generated by DB service at time of document creation (attribute is "_id")
            comicID: String, // the Comic that the image or "cell" is associated with
            ownerUsername: String, // NOTE* OWNER of the COMIC can delete all associated comic cells
            collaboratorUsername: String, // NOTE* COLLABORATOR TO the COMIC can own delete cells he/she created
            toPublish: Boolean
        });

        if (ComicCell.comicCell == null) { // ensure model is only initialized once
            ComicCell.comicCell = this.mongoose.model('ComicCell', this.comicCellSchema);
        }
    }

    // INSERT **WORKS**
    // an _id that we use as ComicID is auto-generated when we insert a new comic object into the DB
    // we pass this id back to the client
    insert(_comicID: String, _ownerUsername: String, _collaboratorUsername: String, _toPublish: Boolean, callback: Function): any {
        var db = this.mongoose.connection;

        // create a new comicCell object with the client-given data fields
        var cc = new ComicCell.comicCell({
            comicID: _comicID,
            ownerUsername: _ownerUsername,  // ownerID and collaboratorID = owner username and collaborator username
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
    }

    // GET ONE comicCell by quering by cell's ID **WORKS**
    get(_comicCellID: String, callback: Function): any {
        var db = this.mongoose.connection;
        var comicCellModel = ComicCell.comicCell;

        // find all the comicCells associated with a single comicID
        comicCellModel.findById({ _id: _comicCellID }, function (err, doc) {
            if (err)
                return console.error(err);
            // pass back the retrieved comic cell object to the client
            callback(doc);
        });

    }

    // GET all comicCells associated with a comic **WORKS**
    getAll(_comicID: String, callback: Function): any {
        var db = this.mongoose.connection;
        var comicCellModel = ComicCell.comicCell;

        // find all the comicCells associated with a single comicID
        comicCellModel.find({ 'comicID': _comicID }, function (err, docs) {
            if (err)
                return console.error(err);
            // pass back the retrieved comic object to the client
            callback(docs);
        });

    }

    // DELETE one comic cell **WORKS**
    delete(_comicCellID: String, _contributorUsername: String, callback: Function): void {
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
            } else {
                console.log("User not authorized to delete comic cell.");
            }
        });
    }

    // DELETE ALL comic cells associated with the same comic **WORKS**
    deleteAll(_comicID: String, _contributorUsername: String, callback: Function): void {
        var db = this.mongoose.connection;
        var comicCellModel = ComicCell.comicCell;

        // get one comic cell to retrieve the ownerUsername of that cell. Assume same ownerUsername for the same ComicID
        comicCellModel.findOne({ 'comicID' : _comicID }, function (err, doc) {
            if (err)
                return console.error(err);
            var ownerUsername = doc.ownerUsername;
                   
            // can delete only if the contributor is the OWNER of the COMIC
            if (_contributorUsername == ownerUsername) {
                comicCellModel.remove({ 'comicID' : _comicID }, function (err, doc) {
                    if (err)
                        return console.error(err);
                    callback();
                });
            } else {
                console.log("User not authorized to delete comic cells.");
            }
        });
    }
}
