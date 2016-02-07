///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import User = require('../models/Comic');
import User = require('../models/ComicCell');

class Comic {

    constructor() { }

    base64_encode(img) {
        // convert binary data to base64 encoded string
        return new Buffer(img).toString('base64');
    }

    startComic() {
        var express = require('express');
        var router = express.Router();

        var db = req.db;
        var ComicCollection = db.get('ComicCollection');
        var ComicCellCollection = db.get('ComicCellCollection');

        /* View Comic: Get from Comic DB */
        router.get('/', function(req, res) {
            
            // Get our specified comic document from the list of comics
            var reqComicID = req.body.comicID;

            // get the document from ComicCollection DB with requested Comic ID
            var doc = ComicCollection.findOne({comicID : reqComicID });
            // extract the value of each field from the comic document
            var comicID = doc.comicID;
            var title = doc.title;
            var author = doc.author;
            var description = doc.description;
            var genre = doc.genre;
            var toPublish = doc.toPublish;
            var img = req.body.img;
            var imgSeqNum = req.body.imgSeqNum;
            
            // create Comic object with above fields
            var comic = new Comic.Comic(comicID, title, author, description, genre, toPublish);

            res.send(comic);

            // TODO: get images from DB and send images back to client

            // get all image documents from ComicCellCollection DB with requested Comic ID
            var cursor = ComicCellCollection.find({comicID: reqComicID });
            // extract the value of eaach field from the comicCell documents and make each into a comicCell object
            comicCells = new ComicCell[100]();
            int i = 0;
            cursor.each(function (err, doc)) {
                var comicID = doc.comicID;
                var imgID = doc.imgID;
                comicCells[i].comicID = comicID;
                comicCells[i].imgID = imgID;
                i++;
            }

            int numOfComicCells = i-1;
            
            // send Comic object and ComicCell objects back to client
            res.send(comic, comicCells, numOfComicCells);
            

        });


        /* Create Comic: Post Comic to ComicCollection and ComicCellCollection DB */
        router.post('/', function(req, res) {
            
            // extract values of new comic data fields
            var comicID = req.body.comicID;
            var title = req.body.title; 
            var author = req.body.author;
            var description = req.body.description; 
            var genre = req.body.genre;
            var toPublish = req.body.toPublish;
            var img = req.body.img;
            var imgSeqNum = req.body.imgSeqNum;

            // create a new comic object with above fields
            var comic = new Comic.Comic(comicID, title, author, description, genre, toPublish);

            // insert new comic into the DB.
            ComicCollection.insert(comic);


            // encode img into binary string
            base64_encode(img);

            // create a new comic cell object
            var comicCell = new ComicCell.ComicCell(comicID, img, imgSeqNum);

            // insert new comic cell object into the DB
            ComicCellCollection.insert(comicCell);

            // redirect client to created comic web page
            res.redirect(“webcomic/comicID”);
        });


        /* Edit Comic: Patch Comic to ComicCollection and ComicCellCollection DB */
        router.patch('/', function(req, res) {
            // extract values of new comic data fields
            var comicID = req.body.comicID;
            var title = req.body.title; 
            var author = req.body.author;
            var description = req.body.description; 
            var genre = req.body.genre;
            var toPublish = req.body.toPublish;

            var comic = new Comic.Comic(comicID, title, author, description, genre, toPublish);


            // replace each field in the document with the specified comicID
            ComicCollection.update({comicId: comicID, 
                {title: title},
                {author: author},
                {description: description},
                {genre: genre},
                {toPublish: toPublish},
                function (err) {
                    ;
                });

            // redirect client to updated comic web page
            res.redirect(“webcomic/comicID”);

            /* save images to DB

            // extract images from req object
            var imgID = req.body.imgID;

            // insert new comic with data fields into the DB.
            ComicCollection.insert({
                "comicID": comic.getComicID();
                "title": comic.getTitle();
                "author": comic.getAuthor();
                "description": comic.getDescription();
                "genre": comic.getGenre();
                "toPublish": comic.getToPublish();
            },

            // TODO: insert new comic images into the DB.
            var cells = ;
            */
        });


        /* Delete Comic: Delete from Comic DB */
        router.delete('/', function(req, res) {
            // get comicID to remove from DB
            var comicID = req.body.comicID;

            // Remove this comic document from DB    
            ComicCollection.remove({ comicID: comicID });

            // Remove all comic cells with comic ID from DB
            ComicCellCollection.remove({ comicID: comicID });
        });

        module.exports = router;

    }

}