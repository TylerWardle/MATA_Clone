///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
//<reference path='../types/DefinitelyTyped/mongodb/mongodb-1.4.9.d.ts'/>
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MATA');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!

    var Schema = mongoose.Schema;
   // var ObjectId = Schema.ObjectId;

    // create the Comic schema
    var ComicCellSchema = new Schema({
        imgName: String,
        comicID: String,
        owner: String,
        collaborator: String // for Sprint 1, this field is unused, set to null
    });

    // create model called Comic that uses the comic schema
    var ComicCell = mongoose.model('ComicCell', ComicCellSchema);

    // make the comic model available to all users in the app
    module.exports = ComicCell;

   // create a new comic cell
    exports.create = function(comicID: string, authorID: string, imgName: string) {
        var cc = new ComicCell({
            comicID: comicID,
            authorID: authorID,
            imgName: imgName
        });

        cc.save(function(err, doc) {});
    }

    // For subsequent sprints
    //exports.edit = function() {}
    
    // get all the comic cells associated with a specific comicID
    exports.get = function(comicID: string) ComicCell[] {

        // initialize an array of new comic cell model objects
        var cc_arr = new ComicCell() [];

        // get all comics from DB and fill each comic object in the array
        int i = 0;
        ComicCell.find({comicID: comicID}, function(err, doc) {
            cc_arr[i].imgName = doc._imgName;
            cc_arr[i].comicID = doc._comicID;
            cc_arr[i].authorID = doc.authorID;
            i++;
        });

        return cc_arr; // TODO: also return number of comic documents in the array
    }

    
    // delete all the comic cells associated with a specific comicID
    exports.delete = function(comicID: string) { 
        // For future sprints, ensure delete is only invoked by the owner or collaborator of the webcell
        ComicCell.delete({_id : ObjectId(comicID)});
    }
}