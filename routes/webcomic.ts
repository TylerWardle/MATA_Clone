///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import Comic = require('../models/Comic');

var express = require('express');
var router = express.Router();

/* View Comic: Get from Comic DB */
router.get('/:id', function(req, res) {
    // get web comic id from reqest parameter in the URL
    var comicID = req.params.id;

    // get web comic id from reqest parameter in the URL
    // send dummy values back to client

    var title = "dummyTitle";
    var author = "dummyAuthor";
    var publicationDate = "dummyPublicationDate";
    var description = "dummyDescrip";
    var genre = "dummyGenre";
    var toPublish = true;

    var comic = new Comic.Comic(comicID, title, author, publicationDate, description, genre, toPublish);

    var response = JSON.stringify(comic);

    res.send(response);
});

/* Create Comic: Post Comic to ComicCollection and ComicCellCollection in DB */
router.post('/create', function(req, res) {
    
    // send dummy values back to client
    var comicID = "111";

    res.send("created a web comic");
/*
    console.log("created a web comic");

    // redirect client to created comic web page
    res.redirect("111");
    */
});

module.exports = router;