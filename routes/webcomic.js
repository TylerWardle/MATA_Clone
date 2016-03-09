///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var Comic = require('../models/Comic');
var ComicCell = require('../models/ComicCell');
var Webcomic = (function () {
    function Webcomic() {
    }
    Webcomic.prototype.startWebcomic = function () {
        var express = require('express');
        var router = express.Router();
        var fs = require('fs');
        var ObjectId = require('mongodb').ObjectID;
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
                    //used to inform the client if the user is the author of a webcomic they are viewing
                    var isAuthor = false;
                    if (req.cookies._id == doc.authorUsername) {
                        isAuthor = true;
                    }
                    cc.getAll(comicID, function (docs) {
                        res.render('webcomic', { "webcomic": doc, "cells": docs, "header": req.headers['host'] + "/webcomic/image/", "isAuthor": isAuthor, "accountType": req.cookies.accountType });
                    });
                });
            }
            else {
                res.redirect('/');
            }
        });
        // Create new comic with associated images (one image/comic for now) **WORKS**
        router.post('/submit', function (req, res) {
            // extract user id of creator/owner of comic from request header
            var authorUsername = req.cookies._id;
            // get values of comic data fields
            var title = req.body.title;
            var publicationDate = req.body.publicationDate;
            var description = req.body.description;
            var genre = req.body.genre;
            var toPublish;
            var openToContribution = req.body.openToContribution;
            //set the toPublish field relative to which submit button is pushed
            if (req.body.submit == "draft") {
                toPublish = false;
            }
            else if (req.body.submit == "publish") {
                toPublish = true;
            }
            var collaboratorUsername = req.body.collaboratorUsername;
            var c = new Comic.Comic(req.mongoose);
            c.insert(title, authorUsername, publicationDate, description, genre, toPublish, openToContribution, function (comicID) {
                // read the image file passed in the request and save it
                fs.readFile(req.file.path, function (err, img) {
                    console.log(req.file);
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
        //Add a new cell to an existing web comic
        router.post('/newCell/:id', function (req, res) {
            // extract comic id from request header
            var comicID = req.params.id;
            console.log(comicID);
            // extract the colaborators id from the cookie
            var collaboratorUsername = req.cookies._id;
            var c = new Comic.Comic(req.mongoose);
            c.get(comicID, function (webcomic) {
                var title = webcomic.title;
                var authorUsername = webcomic.authorUsername;
                var toPublish = webcomic.toPublish;
                fs.readFile(req.file.path, function (err, img) {
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
                            // write image file to uploads/fullsize folder
                            fs.writeFile(newPath, img, function (err) {
                                if (err)
                                    return console.error(err);
                                //redirect to the newly created comic
                                res.redirect('/webcomic/id/' + comicID);
                            });
                        }
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
            var toPublish;
            var openToContribution;
            if (req.body.openToContribution == "on") {
                openToContribution = true;
            }
            else {
                openToContribution = false;
            }
            console.log(req.body);
            //set the toPublish field relative to which submit button is pushed
            if (req.body.submit == "publish") {
                toPublish = true;
            }
            // update the comic
            var c = new Comic.Comic(req.mongoose);
            c.update(comicID, title, authorUsername, publicationDate, description, genre, toPublish, openToContribution, function () {
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
        router.get('/create', function (req, res) {
            res.render('createwebcomic', { title: 'Create a Comic!' });
        });
        module.exports = router;
    };
    return Webcomic;
})();
var webcomic = new Webcomic();
webcomic.startWebcomic();
