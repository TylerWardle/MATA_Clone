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
    var ComicSchema = new Schema({
        comicID: String,
        authorID: String, 
        title: String,
        author_username: String
        publicationDate: Date,
        description: String,
        genre: String,
        toPublish: Boolean
    });

    // create model called Comic that uses the comic schema
    var Comic = mongoose.model('Comic', ComicSchema);

    // make the comic model available to all users in the app
    module.exports = Comic;

   // create a new comic
    exports.create = function(authorID: string, title: string, author_username: string, publicationDate: string, description: string, genre: string, toPublish: boolean) : string {
        var c = new Comic({
            comicID: "null", // this is to be filled later by the auto_generated "_id"
            authorID: authorID,
            title: title,
            author_username: author_username,
            publicationDate = publicationDate, // TODO: convert string to date
            description: description,
            genre: genre,
            toPublish: toPublish
        });

        c.save(function(err, doc) {
            c.comicID = doc._id;        
        });

        return c.comicID;
    }

    exports.edit = function(comicID: string, authorID: string, title: string, author_username: string, publicationDate: string, description: string, genre: string, toPublish: boolean) : string {
        // updated comic
        var c = new Comic({
            comicID: comicID, 
            authorID: authorID,
            title: title,
            author_username: author_username,
            publicationDate = publicationDate, // TODO: convert string to date
            description: description,
            genre: genre,
            toPublish: toPublish
        });
        
        Comic.update(_id: comicID, c, option , function(err, doc));
    }
    
    exports.get = function(comicID: string) : Comic {

        // initialize a new comic model object
        var c = new Comic();

        // get comic from DB and set comic model object field values to that of requested comic document
        Comic.findById(comicID, function(err, doc) {
            c.comicID = doc._id;
            c.authorID = doc.authorID;
            c.title = doc.title;
            c.author_username = doc.author_username;
            c.publicationDate = doc.publicationDate; // TODO: convert date to string
            c.description = doc.description;
            c.genre = doc.genre;
            c.toPublish = doc.toPublish;
        });

        return c;
    }

    exports.getAll = function() Comic[] {

        // initialize an array of new comic model objects
        var c_arr = new Comic() [];

        // get all comics from DB and fill each comic object in the array
        int i = 0;
        Comic.find({}, function(err, doc) {
            c_arr[i].comicID = doc._id;
            c_arr[i].authorID = doc.authorID;
            c_arr[i].title = doc.title;
            c_arr[i].author_username = doc.author_username;
            c_arr[i].publicationDate = doc.publicationDate; // TODO: convert date to string
            c_arr[i].description = doc.description;
            c_arr[i].genre = doc.genre;
            c_arr[i].toPublish = doc.toPublish;
            i++;
        });

        return c_arr; // TODO: also return number of comic documents in the array
    }

    
    exports.delete = function() {

    }
}

