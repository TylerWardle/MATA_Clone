///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
<<<<<<< HEAD
=======
var Comic = require('../models/Comic');
var ComicCell = require('../models/ComicCell');
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
var Webcomic = (function () {
    function Webcomic() {
    }
    Webcomic.prototype.startWebcomic = function () {
        var express = require('express');
        var router = express.Router();
        var fs = require('fs');
        var ObjectId = require('mongodb').ObjectID;
<<<<<<< HEAD
        /* View Comic: Get from Comic DB */
        router.get('/id/:id', function (req, res) {
            var db = req.db;
            var ComicCollection = db.get('ComicCollection');
            // get web comic id from reqest parameter in the URL
            var comicID = req.params.id;
            // RETRIEVE COMIC DATA FROM DB----------------------------------------------------------------------------------------------
            // find comic in the db table
            if (req.cookies._id != null) {
                ComicCollection.findOne({ _id: ObjectId(comicID) }, function (err, webcomic) {
                    res.render('webcomic', { "webcomic": webcomic });
=======
        // View comic with associated images (one image/comic for now) **WORKS** 
        // TODO: image does not display correctly!!
        router.get('/id/:id', function (req, res) {
            // get web comic id from reqest parameter in the URL
            var comicID = req.params.id;
            // get comic from the db
            if (req.cookies._id != null) {
                var c = new Comic.Comic(req.mongoose);
                c.get(comicID, function (doc) {
                    var cc = new ComicCell.ComicCell(req.mongoose);
                    cc.getAll(comicID, function (docs) {
                        res.render('webcomic', { "webcomic": doc, "cells": docs, "header": req.headers['host'] + "/webcomic/image/" });
                    });
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
                });
            }
            else {
                res.redirect('/');
            }
        });
<<<<<<< HEAD
        /* Create Comic: Post Comic to ComicCollection and ComicCellCollection in DB */
        router.post('/submit', function (req, res) {
            var db = req.db;
            var ComicCollection = db.get('ComicCollection');
            var contributors = db.get('contributors');
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
                if (!imageName) {
                    console.log("There was an error");
                    res.redirect("./create");
                    res.end();
                }
                else {
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
                    }, function (err, doc) {
                        //redirect to the newly created comic
                        var comicID = doc._id;
                        contributors.update({ guid: ObjectId(req.cookies._id) }, { $addToSet: {
                                "comics": [comicID]
                            }
                        });
                        res.redirect('./id/' + comicID);
                    });
                }
            });
        });
        // get an image stored in uploads/fullsize/    
        router.get('/image/:file', function (req, res) {
            var file = req.params.file;
            var img = fs.readFileSync("./uploads/fullsize/" + file);
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(img, 'binary');
        });
        /* Edit Comic: Patch Comic to ComicCollection and ComicCellCollection DB */
        router.post('/update/:id', function (req, res) {
            var db = req.db;
            var ComicCollection = db.get('ComicCollection');
            // get web comic id from reqest parameter in the URL
            var comicID = req.params.id;
            // extract user id of creator/owner of comic from request header
            var authorID = req.cookies._id;
            // extract values of all the comic data fields incl. ones to be updated
            var title = req.body.title;
            //var author_username = req.body.author_username;
            var description = req.body.description;
            var genre = req.body.genre;
            var toPublish = req.body.toPublish;
            // find the comic document in the DB and update it
            ComicCollection.update({ _id: ObjectId(comicID) }, { $set: {
                    "authorID": authorID,
                    "title": title,
                    "description": description,
                    "genre": genre,
                    "toPublish": toPublish
                }
            });
            // redirect client to updated comic web page
            res.redirect('/webcomic/id/' + comicID);
        });
        router.get('/edit/:id', function (req, res) {
            var db = req.db;
            var ComicCollection = db.get('ComicCollection');
            var comicID = req.params.id;
            // find comic in the db table
            ComicCollection.findOne({ _id: ObjectId(comicID) }, function (err, webcomic) {
                res.render('webcomicedit', { "webcomic": webcomic });
            });
        });
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
=======
        // Create new comic with associated images (one image/comic for now) **WORKS**
        router.post('/submit', function (req, res) {
            // extract user id of creator/owner of comic from request header
            var authorUsername = req.cookies._id;
            // get values of comic data fields
            var title = req.body.title;
            var publicationDate = req.body.publicationDate;
            var description = req.body.description;
            var genre = req.body.genre;
            var toPublish = req.body.toPublish;
            var collaboratorUsername = req.body.collaboratorUsername;
            var c = new Comic.Comic(req.mongoose);
            c.insert(title, authorUsername, publicationDate, description, genre, toPublish, function (comicID) {
                // read the image file passed in the request and save it
                fs.readFile(req.file.path, function (err, img) {
                    console.log(img);
                    var cc = new ComicCell.ComicCell(req.mongoose);
                    cc.insert(comicID, authorUsername, collaboratorUsername, toPublish, function (imgName) {
                        // If there's an error
                        if (!imgName) {
                            console.log("There was an error");
                            res.redirect("./create");
                            res.end();
                        }
                        else {
                            var newPath = "./uploads/fullsize/" + imgName;
                            var imageList = [(req.headers['host'] + "/webcomic/image/" + imgName)];
                            // write image file to uploads/fullsize folder
                            fs.writeFile(newPath, img, function (err) {
                                if (err)
                                    return console.error(err);
                                //redirect to the newly created comic
                                res.redirect('./id/' + comicID);
                            });
                        }
                        // TODO: need to change below code to reflect mongoose operations instead of mongodb
                        // add comicID to Contributors Model
                        /*
                        var db = req.db;
                        var contributors = db.get('contributors');
                        var ObjectId = require('mongodb').ObjectID;
                        contributors.update({ guid: ObjectId(req.cookies._id) }, {
                            $addToSet: {
                                "comics": [comicID]
                            }
                        });
                        */
                    });
                });
            });
        });
        // get an image stored in uploads/fullsize/    
        router.get('/image/:file', function (req, res) {
            var file = req.params.file;
            var img = fs.readFileSync("./uploads/fullsize/" + file);
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(img, 'binary');
        });
        // Edit Comic (for now cannot edit associated images) **WORKS**
        router.post('/update/:id', function (req, res) {
            // get web comic id from reqest parameter in the URL
            var comicID = req.params.id;
            // extract username of owner of comic from the request header
            var authorUsername = req.cookies._id;
            // extract values of all the comic data fields 
            var title = req.body.title;
            var publicationDate = req.body.publicationDate;
            var description = req.body.description;
            var genre = req.body.genre;
            var toPublish = req.body.toPublish;
            // update the comic
            var c = new Comic.Comic(req.mongoose);
            c.update(comicID, title, authorUsername, publicationDate, description, genre, toPublish, function () {
                // redirect client to updated comic web page
                res.redirect('/webcomic/id/' + comicID);
            });
        });
        // Retrieve old comic fields to edit on **WORKS**
        router.get('/edit/:id', function (req, res) {
            var comicID = req.params.id;
            var c = new Comic.Comic(req.mongoose);
            c.get(comicID, function (doc) {
                res.render('webcomicedit', { "webcomic": doc });
            });
        });
        // Delete Comic: Delete one comic and all associated cells ** NEED TO BE TESTED**
        router.delete('./:id', function (req, res) {
            // get comicID identifying which comic to delete from reqest parameter in the URL
            var comicID = req.params.id;
            var authorUsername = req.cookies._id;
            // Remove this comic document
            var c = new Comic.Comic(req.mongoose);
            c.delete(comicID, authorUsername, function () {
                // remove associated comic cell documents
                var cc = new ComicCell.ComicCell(req.mongoose);
                cc.deleteAll(comicID, authorUsername, function () { });
            });
        });
        // create a webcomic route
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
        router.get('/create', function (req, res) {
            res.render('createwebcomic', { title: 'Create a Comic!' });
        });
        module.exports = router;
    };
    return Webcomic;
})();
var webcomic = new Webcomic();
webcomic.startWebcomic();
