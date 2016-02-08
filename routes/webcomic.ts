///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import Comic = require('../models/Comic');

var express = require('express');
var router = express.Router();

/* View Comic: Get from Comic DB */
router.get('/:id', function(req, res) {
    var db = req.db;
    var ComicCollection = db.get('ComicCollection');

    // get web comic id from reqest parameter in the URL
    var comicID = req.params.id;

    // find comic in the db table
    var doc = ComicCollection.findOne({_id : comicID });

    // extract the value of each field from the comic document
    var title = doc.title;
    var authorID = doc.authorID;
    var author_username = doc.author_username;
    var publicationDate = doc.publicationDate;
    var description = doc.description;
    var genre = doc.genre;
    var toPublish = doc.toPublish;
    
    var comic = new Comic.Comic(comicID, authorID, title, author_username, publicationDate, description, genre, toPublish);

    var response = JSON.stringify(comic);

    res.send(response);
});

/* Create Comic: Post Comic to ComicCollection and ComicCellCollection in DB */
router.post('/create', function(req, res) {
    var db = req.db;
    var ComicCollection = db.get('ComicCollection');
    
    // extract user id of creator/owner of comic from request header
    var authorID = req.headers['_id'];

    // extract values of new comic data fields
    var title = req.body.title; 
    var author_username = req.body.author_username;
    var description = req.body.description; 
    var genre = req.body.genre;
    var toPublish = req.body.toPublish;
    //var img = req.body.img;

    // insert comic in DB
    ComicCollection.insert({authorID: authorID, title: title, author_username: author_username, description: description, genre: genre, toPublish: toPublish}, function(err, doc) {
        var comicID = doc._id;
    });

    // redirect client to newly created web comic page
    //res.redirect("111");
    //res.render('viewer', { title: 'Welcome back!'});
});

/* Edit Comic: Patch Comic to ComicCollection and ComicCellCollection DB */
router.put('/:id', function(req, res) {
    var db = req.db;
    var ComicCollection = db.get('ComicCollection');
    
    // get web comic id from reqest parameter in the URL
    var comicID = req.params.id;

    // extract user id of creator/owner of comic from request header
    var authorID = req.headers['_id'];

    // extract values of all the comic data fields incl. ones to be updated
    var title = req.body.title; 
    var author_username = req.body.author_username;
    var description = req.body.description; 
    var genre = req.body.genre;
    var toPublish = req.body.toPublish;

    // find the comic document in the DB and update it
    var doc = ComicCollection.update({_id : comicID }, {authorID: authorID, title: title, author_username: author_username, description: description, genre: genre, toPublish: toPublish});

    // make new collection if comic does not exist in DB
    //   { upsert: true }

    // redirect client to updated comic web page
    //res.redirect(“webcomic/comicID”);
});

/* Delete Comic: Delete from ComicCollection and ComicCellCollection in DB */
router.delete('/:id', function(req, res) {
    var db = req.db;
    var ComicCollection = db.get('ComicCollection');

    // get web comic id from reqest parameter in the URL
    var comicID = req.params.id;

    // Remove this comic document from DB    
    ComicCollection.remove({_id: comicID });
});


module.exports = router;