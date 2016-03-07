///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

//*********************************************************************************************
// TODO: FIGURE OUT HOW TO FILTER GET RESULTS TO                                O   O
//INCLUDE OR NOT TO INCLUDE UNPUBLISHED COMICS & CELLS BASED ON TYPE OF USER      V
//*********************************************************************************************


import Comic = require('../models/Comic');
import ComicCell = require('../models/ComicCell');

class Webcomic {

    constructor() {}

    startWebcomic() {

        var express = require('express');
        var router = express.Router();
        var fs = require('fs');
        var ObjectId = require('mongodb').ObjectID;


        // View comic with associated images (one image/comic for now) 
        // TODO: image does not display correctly!!
        router.get('/id/:id', function (req, res) {
            // get web comic id from reqest parameter in the URL
            var comicID = req.params.id;
            
            // get comic from the db
            if (req.cookies._id != null) {
                var c = new Comic.Comic(req.mongoose);
                c.get(comicID, (doc: any): void => {
                    var cc = new ComicCell.ComicCell(req.mongoose);
                    cc.getAll(comicID, (docs: any): void => {
                        var imageHeader = req.headers['host'] + "/webcomic/image/";
                        res.render('webcomic', { "webcomic": doc, "cells": docs, imageHeader });
                    });
                });
            } else {
                res.redirect('/');
            }
        });

        // Create new comic with associated images (one image/comic for now)
        router.post('/submit', function (req, res) {
            // extract user id of creator/owner of comic from request header
            var authorID = req.cookies._id;

            var db = req.db;
            var contributors = db.get('contributors');
            // get author username
            contributors.findOne({ guid: ObjectID(authorID) }, function (error, contributor) {
                var authorUsername = contributor.username;

                // get values of comic data fields
                var title = req.body.title;
                var description = req.body.description;
                var genre = req.body.genre;
                var toPublish = req.body.toPublish;
                var collaboratorID = req.body.collaboratorID;

                var c = new Comic.Comic(req.mongoose);
                c.insert(title, authorID, authorUsername, description, genre, toPublish, (comicID: String): void => {
                    // read the image file passed in the request and save it
                    fs.readFile(req.file.path, function (err, img) {
                        console.log(img);

                        var cc = new ComicCell.ComicCell(req.mongoose);
                        cc.insert(comicID, authorID, collaboratorID, toPublish, (imgName: String): void=> {
                            // If there's an error
                            if (!imgName) {
                                console.log("There was an error")
                                res.redirect("./create");
                                res.end();
                            } else {
                                var newPath = "./uploads/fullsize/" + imgName;
                                                
                                // write image file to uploads/fullsize folder
                                fs.writeFile(newPath, img, function (err) {
                                    if (err)
                                        return console.error(err);
                                    //redirect to the newly created comic
                                    res.redirect('./id/' + comicID);
                                });
                            }
                        });
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

        // Edit Comic (for now cannot edit associated images) 
        router.post('/update/:id', function (req, res) {
            // get web comic id from reqest parameter in the URL
            var comicID = req.params.id;

            // extract values of all the comic data fields 
            var title = req.body.title;
            var authorID = req.body.authorID;
            var authorUsername = req.body.authorUsername;
            var publicationDate = req.body.publicationDate;
            var description = req.body.description;
            var genre = req.body.genre;
            var toPublish = req.body.toPublish;

           
            // update the comic
            var c = new Comic.Comic(req.mongoose);
            c.update(comicID, title, authorID, authorUsername, publicationDate, description, genre, toPublish, (): void => {
                // redirect client to updated comic web page
                res.redirect('/webcomic/id/' + comicID);
            });
        });

        // Retrieve old comic fields to edit on **WORKS**
        router.get('/edit/:id', function (req, res) {
            var comicID = req.params.id;

            var c = new Comic.Comic(req.mongoose);
            c.get(comicID, (doc: any): void => {
                res.render('webcomicedit', { "webcomic": doc });
            });
        });

        // Delete Comic: Delete one comic and all associated cells 
        router.delete('./:id', function (req, res) {
            // get comicID identifying which comic to delete from reqest parameter in the URL
            var comicID = req.params.id;
            var authorID = req.params.id;
        
            // Remove this comic document
            var c = new Comic.Comic(req.mongoose);
            c.delete(comicID, authorID, (): void => {
                // remove associated comic cell documents
                var cc = new ComicCell.ComicCell(req.mongoose);
                cc.deleteAll(comicID, authorID, (): void => { });
            });
        });

        // create a webcomic route
        router.get('/create', function (req, res) {
            res.render('createwebcomic', { title: 'Create a Comic!' });
        });


        // make a route for get random webcomic ID **NEEDS TO BE TESTED**
        router.get('/random', function (req, res) {
            var c = new Comic.Comic(req.mongoose);
            c.getAll((docs: any): void => {
                var numOfComicIDs = 0;
                var comicIDArr = new Array<String>();
                for (var i = 0; i < docs.length; i++) {
                    if (docs[i].toPublish) {
                        comicIDArr.push(docs[i]._id);
                        numOfComicIDs++;
                    }
                }

                var min = 0;
                var max = numOfComicIDs;
                var randomArrIndex = Math.floor(Math.random() * (max - min + 1) + min);

                res.redirect('/webcomic/id/' + comicIDArr[randomArrIndex]);
            });
        });


        router.get('/browse/title', function (req, res) { // sort by alphabetical order
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);

            c.getComicsSortedByTitle((docs: any): void => {
                var numOfComicIDs = 0;
                var comicIDArr = new Array<String>();
                for (var i = 0; i < docs.length; i++) { // get all comicIDs of published comics
                    if (docs[i].toPublish) {
                        comicIDArr.push(docs[i]._id);
                        numOfComicIDs++;
                    }
                }

                var comicCellIDArr = new Array<String>();

                var imageHeader = req.headers['host'] + "/webcomic/image/";

                var i = 0;
                function getAssociatedCell() {
                    cc.getAll(comicIDArr[i], (docs: any): void => {
                        if (i == numOfComicIDs) { // finished getting all the associated images    
                            res.render('webcomic', { "webcomic": comicIDArr, "cells": comicCellIDArr });;
                        } else {
                            comicCellIDArr.push(imageHeader + docs[0]._id); // append image route header to image name (only one associated image chosen)
                            i++;
                            getAssociatedCell();
                        }
                    });
                }
            });
        });

        router.get('/browse/author', function (req, res) { // sort by alphabetical order
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);

            c.getComicsSortedByAuthor((docs: any): void => {
                var numOfComicIDs = 0;
                var comicIDArr = new Array<String>();
                for (var i = 0; i < docs.length; i++) { // get all comicIDs of published comics
                    if (docs[i].toPublish) {
                        comicIDArr.push(docs[i]._id);
                        numOfComicIDs++;
                    }
                }

                var comicCellIDArr = new Array<String>();

                var imageHeader = req.headers['host'] + "/webcomic/image/";

                var i = 0;
                function getAssociatedCell() {
                    cc.getAll(comicIDArr[i], (docs: any): void => {
                        if (i == numOfComicIDs) { // finished getting all the associated images    
                            res.render('webcomic', { "webcomic": comicIDArr, "cells": comicCellIDArr });;
                        } else {
                            comicCellIDArr.push(imageHeader + docs[0]._id); // append image route header to image name (only one associated image chosen)
                            i++;
                            getAssociatedCell();
                        }
                    });
                }
            });
        });

        router.get('/browse/genre/comedy', function (req, res) { // get all comics of comedy genre
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);
        });

        router.get('/browse/genre/scifi', function (req, res) { // get all comics of drama genre
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);
        });

        router.get('/browse/genre/adventure', function (req, res) { // get all comics of drama genre
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);
        });

        router.get('/browse/genre/mystery', function (req, res) { // get all comics of drama genre
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);
        });

        router.get('/browse/genre/action', function (req, res) { // get all comics of drama genre
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);
        });

        router.get('/browse/publication_date/asc', function (req, res) {  // sort by newest to oldest
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);

            c.getComicsSortedByMostRecentlyPublished((docs: any): void => {
                var numOfComicIDs = 0;
                var comicIDArr = new Array<String>();
                for (var i = 0; i < docs.length; i++) { // get all comicIDs of published comics
                    if (docs[i].toPublish) {
                        comicIDArr.push(docs[i]._id);
                        numOfComicIDs++;
                    }
                }

                var comicCellIDArr = new Array<String>();

                var imageHeader = req.headers['host'] + "/webcomic/image/";

                var i = 0;
                function getAssociatedCell() {
                    cc.getAll(comicIDArr[i], (docs: any): void => {
                        if (i == numOfComicIDs) { // finished getting all the associated images    
                            res.render('webcomic', { "webcomic": comicIDArr, "cells": comicCellIDArr });;
                        } else {
                            comicCellIDArr.push(imageHeader + docs[0]._id); // append image route header to image name (only one associated image chosen)
                            i++;
                            getAssociatedCell();
                        }
                    });
                }
            });
        });

        router.get('/browse/publication_date/desc', function (req, res) {  // sort by oldest to newest 
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);

            c.getComicsSortedByLeastRecentlyPublished((docs: any): void => {
                var numOfComicIDs = 0;
                var comicIDArr = new Array<String>();
                for (var i = 0; i < docs.length; i++) { // get all comicIDs of published comics
                    if (docs[i].toPublish) {
                        comicIDArr.push(docs[i]._id);
                        numOfComicIDs++;
                    }
                }

                var comicCellIDArr = new Array<String>();

                var imageHeader = req.headers['host'] + "/webcomic/image/";

                var i = 0;
                function getAssociatedCell() {
                    cc.getAll(comicIDArr[i], (docs: any): void => {
                        if (i == numOfComicIDs) { // finished getting all the associated images    
                            res.render('webcomic', { "webcomic": comicIDArr, "cells": comicCellIDArr });;
                        } else {
                            comicCellIDArr.push(imageHeader + docs[0]._id); // append image route header to image name (only one associated image chosen)
                            i++;
                            getAssociatedCell();
                        }
                    });
                }
            });
        });

        module.exports = router;
    }
} 

var webcomic = new Webcomic();
webcomic.startWebcomic();
