///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import Comic = require('../models/Comic');

var express = require('express');
var router = express.Router();


/* View Comic: Get from Comic DB 
router.get('/:id', function(req, res) {
    // get web comic id from reqest parameter in the URL
    var comicID = req.params.id;
*/
/* View Comic: Get from Comic DB */
router.get('/', function(req, res) {
    // get web comic id from reqest parameter in the URL
    // send dummy values back to client
    var comicID = "12345";
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

module.exports = router;