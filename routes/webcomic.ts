///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import Comic = require('../models/Comic');

var express = require('express');
var router = express.Router();
var fs = require('fs');
var ObjectId = require('mongodb').ObjectID;


/* View Comic: Get from Comic DB */
router.get('/id/:id', function(req, res) {
    var db = req.db;
    var ComicCollection = db.get('ComicCollection');

    // get web comic id from reqest parameter in the URL
    var comicID = req.params.id;
    
// RETRIEVE COMIC DATA FROM DB----------------------------------------------------------------------------------------------
    // find comic in the db table
    ComicCollection.findOne({_id : ObjectId(comicID)}, function(err, webcomic) {
        res.render('webcomic',{"webcomic": webcomic});
    });
    

});

/* Create Comic: Post Comic to ComicCollection and ComicCellCollection in DB */
router.post('/submit', function(req, res) {
    var db = req.db;
    var ComicCollection = db.get('ComicCollection');
    
    // extract user id of creator/owner of comic from request header
    var authorID = req.cookies._id;
    
    // extract values of new comic data fields
    var title = req.body.title; 
    var description = req.body.description; 
    var genre = req.body.genre;
    var toPublish = req.body.toPublish;
    
    // read the file passed in the request and save it
    fs.readFile(req.file.path, function (err, data) {
        console.log(data);
        var imageName = req.file.originalname;
        // If there's an error
        if(!imageName){
          console.log("There was an error")
          res.redirect("./create");
          res.end();
        } else {
          var newPath = "./uploads/fullsize/" + imageName;
          var imageList = [(req.headers['host'] + "/webcomic/image/" + imageName)];
            
          // write file to uploads/fullsize folder
          fs.writeFile(newPath, data, function (err) {
          });
            
          // insert comic in DB
          ComicCollection.insert({
            authorID: authorID, 
            title: title,  
            description: description, 
            genre: genre, 
            toPublish: toPublish,
            images: imageList
          },
            function(err, doc) {
                //redirect to the newly created comic
                var comicID = doc._id;
                res.redirect('./id/' + comicID);
          })  
            
        }
      });
    
    });
      
// get an image stored in uploads/fullsize/    
router.get('/image/:file', function (req, res){
        var file = req.params.file;
        var img = fs.readFileSync("./uploads/fullsize/" + file);
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(img, 'binary');

});

///* Edit Comic: Patch Comic to ComicCollection and ComicCellCollection DB */
//router.put('edit/:id', function(req, res) {
//    var db = req.db;
//    var ComicCollection = db.get('ComicCollection');
//    
//    // get web comic id from reqest parameter in the URL
//    var comicID = req.params.id;
//
//    // extract user id of creator/owner of comic from request header
//    var authorID = req.headers['_id'];
//
//    // extract values of all the comic data fields incl. ones to be updated
//    var title = req.body.title; 
//    var author_username = req.body.author_username;
//    var description = req.body.description; 
//    var genre = req.body.genre;
//    var toPublish = req.body.toPublish;
//
//    // find the comic document in the DB and update it
//    var doc = ComicCollection.update({_id : ObjectId(comicID)}, {"authorID": authorID, "title": title, "author_username": author_username, "description": description, "genre": genre, "toPublish": toPublish});
//
//    // make new collection if comic does not exist in DB
//    //   { upsert: true }
//
//    // redirect client to updated comic web page
//    //res.redirect(“webcomic/comicID”);
//});
//
///* Delete Comic: Delete from ComicCollection and ComicCellCollection in DB */
//router.delete('./:id', function(req, res) {
//    var db = req.db;
//    var ComicCollection = db.get('ComicCollection');
//
//    // get web comic id from reqest parameter in the URL
//    var comicID = req.params.id;
//
//    // Remove this comic document from DB    
//    ComicCollection.remove({_id : ObjectId(comicID)});
//});

router.get('/create', function(req,res){
    res.render('createwebcomic',{ title: 'Create a Comic!' });    
});
    

module.exports = router;