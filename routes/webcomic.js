///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
//<reference path='../types/DefinitelyTyped/mongodb/mongodb-1.4.9.d.ts'/>
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>
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
        // View comic with associated images (one image/comic for now)
        // TODO: image does not display correctly!!
        router.get('/id/:id', function (req, res) {
            // get web comic id from reqest parameter in the URL
            var comicID = req.params.id;
            var db = req.db;
            var registeredUsers = db.get('registeredUsers');
            registeredUsers.findOne({ _id: req.cookies._id }, function (err, user) {
                // get comic from the db
                if (req.cookies._id != null) {
                    var c = new Comic.Comic(req.mongoose);
                    c.get(comicID, function (doc) {
                        var cc = new ComicCell.ComicCell(req.mongoose);
                        //used to inform the client if the user is the author of a webcomic they are viewing
                        var isAuthor = false;
                        if (req.cookies._id == doc.authorID) {
                            isAuthor = true;
                        }
                        cc.getAll(comicID, function (docs) {
                            res.render('webcomic', { "user": user,
                                "webcomic": doc,
                                "cells": docs,
                                "header": req.headers['host'] + "/webcomic/image/",
                                "isAuthor": isAuthor,
                                "accountType": req.cookies.accountType });
                        });
                    });
                }
                else {
                    res.redirect('/');
                }
            });
        });
        // Create new comic with associated images (one image/comic for now) **WORKS**
        router.post('/submit', function (req, res) {
            // extract user id of creator/owner of comic from request header
            var authorID = req.cookies._id;
            var authorUsername = req.cookies.userName;
            var publicationDate;
            // get values of comic data fields
            var title = req.body.title;
            var description = req.body.description;
            var genre = req.body.genre;
            var toPublish;
            var openToContribution;
            var thumbnailID = "";
            if (req.body.openToContribution == "on") {
                openToContribution = true;
            }
            else {
                openToContribution = false;
            }
            //set the toPublish field relative to which submit button is pushed
            if (req.body.submit == "draft") {
                toPublish = false;
            }
            else if (req.body.submit == "publish") {
                toPublish = true;
            }
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);
            fs.readFile(req.file.path, function (err, img) {
                c.insert(title, authorID, authorUsername, description, genre, toPublish, openToContribution, thumbnailID, function (comicID) {
                    // read the image file passed in the request and save it
                    cc.insert(comicID, authorID, authorID, toPublish, function (imgName) {
                        // If there's an error
                        if (!imgName) {
                            console.log("There was an error");
                            res.redirect("./create");
                            res.end();
                        }
                        else {
                            //var newPath = "./uploads/fullsize/" + imgName;
                            c.update(comicID, title, authorID, authorUsername, publicationDate, description, genre, toPublish, openToContribution, imgName, function () { });
                            var newPath = "./uploads/fullsize/" + imgName;
                            //var imageList = [(req.headers['host'] + "/webcomic/image/" + imgName)];
                            // write image file to uploads/fullsize folder
                            fs.writeFile(newPath, img, function (err) {
                                if (err)
                                    return console.error(err);
                                //redirect to the newly created comic
                                res.redirect('./id/' + comicID);
                            });
                        }
                        var db = req.db;
                        var contributors = db.get('contributors');
                        var ObjectId = require('mongodb').ObjectID;
                        contributors.update({ guid: ObjectId(req.cookies._id) }, {
                            $addToSet: {
                                comicIDs: [comicID]
                            }
                        });
                    });
                });
            });
        });
        //Add a new cell to an existing web comic
        router.post('/newCell/:id', function (req, res) {
            // extract comic id from request header
            var comicID = req.params.id;
            //console.log(comicID);
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
        // Edit Comic (for now cannot edit associated images) 
        router.post('/update/:id', function (req, res) {
            // get web comic id from reqest parameter in the URL
            var comicID = req.params.id;
            // extract username of owner of comic from the request header
            var authorID = req.cookies._id;
            var authorUsername = req.cookies.userName;
            // extract values of all the comic data fields 
            var title = req.body.title;
            var publicationDate = req.body.publicationdate;
            var description = req.body.description;
            var genre = req.body.genre;
            var toPublish;
            var openToContribution;
            var thumbnailID;
            if (req.body.openToContribution == "on") {
                openToContribution = true;
            }
            else {
                openToContribution = false;
            }
            //set the toPublish field relative to which submit button is pushed
            if (req.body.submit == "publish") {
                toPublish = true;
            }
            // update the comic
            var c = new Comic.Comic(req.mongoose);
            c.update(comicID, title, authorID, authorUsername, publicationDate, description, genre, toPublish, openToContribution, thumbnailID, function () {
                // redirect client to updated comic web page
                res.redirect('/webcomic/id/' + comicID);
            });
        });
        // Retrieve old comic fields to edit on 
        router.get('/edit/:id', function (req, res) {
            var comicID = req.params.id;
            var c = new Comic.Comic(req.mongoose);
            c.get(comicID, function (doc) {
                res.render('webcomicedit', { "webcomic": doc });
            });
        });
        // Delete Comic: Delete one comic and all associated cells 
        router.delete('./:id', function (req, res) {
            // get comicID identifying which comic to delete from reqest parameter in the URL
            var comicID = req.params.id;
            var authorID = req.cookies._id;
            // Remove this comic document
            var c = new Comic.Comic(req.mongoose);
            c.delete(comicID, authorID, function () {
                // remove associated comic cell documents
                var cc = new ComicCell.ComicCell(req.mongoose);
                cc.deleteAll(comicID, authorID, function () { });
            });
        });
        // create a webcomic route
        router.get('/create', function (req, res) {
            res.render('createwebcomic', { title: 'Create a Comic!' });
        });
        // make a route for get random webcomic ID 
        router.get('/random', function (req, res) {
            var c = new Comic.Comic(req.mongoose);
            c.getAll(function (docs) {
                var numOfComicIDs = 0;
                var comicIDArr = new Array();
                for (var i = 0; i < docs.length; i++) {
                    if (docs[i].toPublish) {
                        comicIDArr.push(docs[i]._id);
                        numOfComicIDs++;
                    }
                }
                var min = 0;
                var max = numOfComicIDs;
                var randomArrIndex = Math.floor(Math.random() * (max - min + 1) + min);
                if (randomArrIndex < 0) {
                    res.render("error", { message: "No webcomics found." });
                }
                else {
                    res.redirect('/webcomic/id/' + comicIDArr[randomArrIndex].toString());
                }
            });
        });
        //        // sends client a list of comicID links to published web comics and a list of its representative images
        //        router.get('/browse/title', function (req, res) { // sort by alphabetical order
        //            var c = new Comic.Comic(req.mongoose);
        //            var cc = new ComicCell.ComicCell(req.mongoose);
        //
        //            c.getComicsSortedByTitle((comicObjs: any): void => {
        //                if (comicObjs.length == 0) {
        //                    res.render('webcomic', { "webcomic": new Array<String>(), "cells": new Array<String>() });
        //                    return;
        //                }
        //                c.extractPublishedComicIDs(comicObjs, (comicIDs): void => { // list of raw comicIDs without headers
        //                    var imageHeader = req.headers['host'] + "/webcomic/image/";
        //                    cc.getRepresentativeImages(comicIDs, imageHeader, (comicCellIDs): void => { // list of comicCellIDs with headers
        //                        var comicHeader = req.headers['host'] + "/webcomic/id/";
        //                        for (var i = 0; i < comicIDs.length; i++) { // append header to raw comicIDs in comicIDs list
        //                            comicIDs[i] = comicHeader + comicIDs[i];
        //                        }
        //                        res.render('webcomic', { "webcomic": comicIDs, "cells": comicCellIDs });
        //                    });
        //                });
        //            });
        //        });
        //
        //        router.get('/browse/author', function (req, res) { // sort by alphabetical order
        //            var c = new Comic.Comic(req.mongoose);
        //            var cc = new ComicCell.ComicCell(req.mongoose);
        //
        //            c.getComicsSortedByAuthor((comicObjs: any): void => {
        //                if (comicObjs.length == 0) {
        //                    res.render('webcomic', { "webcomic": new Array<String>(), "cells": new Array<String>() });
        //                    return;
        //                }
        //                c.extractPublishedComicIDs(comicObjs, (comicIDs): void => { // list of raw comicIDs without headers
        //                    var imageHeader = req.headers['host'] + "/webcomic/image/";
        //                    cc.getRepresentativeImages(comicIDs, imageHeader, (comicCellIDs): void => { // list of comicCellIDs with headers
        //                        var comicHeader = req.headers['host'] + "/webcomic/id/";
        //                        for (var i = 0; i < comicIDs.length; i++) { // append header to raw comicIDs in comicIDs list
        //                            comicIDs[i] = comicHeader + comicIDs[i];
        //                        }
        //                        res.render('webcomic', { "webcomic": comicIDs, "cells": comicCellIDs });
        //                    });
        //                });
        //            });
        //        });
        //
        //        router.get('/browse/publication_date/oldest', function (req, res) {  // sort by oldest to newest 
        //            var c = new Comic.Comic(req.mongoose);
        //            var cc = new ComicCell.ComicCell(req.mongoose);
        //
        //            c.getComicsSortedByLeastRecentlyPublished((comicObjs: any): void => {
        //                if (comicObjs.length == 0) {
        //                    res.render('webcomic', { "webcomic": new Array<String>(), "cells": new Array<String>() });
        //                    return;
        //                }
        //                c.extractPublishedComicIDs(comicObjs, (comicIDs): void => { // list of raw comicIDs without headers
        //                    var imageHeader = req.headers['host'] + "/webcomic/image/";
        //                    cc.getRepresentativeImages(comicIDs, imageHeader, (comicCellIDs): void => { // list of comicCellIDs with headers
        //                        var comicHeader = req.headers['host'] + "/webcomic/id/";
        //                        for (var i = 0; i < comicIDs.length; i++) { // append header to raw comicIDs in comicIDs list
        //                            comicIDs[i] = comicHeader + comicIDs[i];
        //                        }
        //                        res.render('webcomic', { "webcomic": comicIDs, "cells": comicCellIDs });
        //                    });
        //                });
        //            });
        //        });
        //
        //        router.get('/browse/publication_date/newest', function (req, res) {  // sort by newest to oldest
        //            var c = new Comic.Comic(req.mongoose);
        //            var cc = new ComicCell.ComicCell(req.mongoose);
        //
        //            c.getComicsSortedByMostRecentlyPublished((comicObjs: any): void => {
        //                if (comicObjs.length == 0) {
        //                    res.render('webcomic', { "webcomic": new Array<String>(), "cells": new Array<String>() });
        //                    return;
        //                }
        //                c.extractPublishedComicIDs(comicObjs, (comicIDs): void => { // list of raw comicIDs without headers
        //                    var imageHeader = req.headers['host'] + "/webcomic/image/";
        //                    cc.getRepresentativeImages(comicIDs, imageHeader, (comicCellIDs): void => { // list of comicCellIDs with headers
        //                        var comicHeader = req.headers['host'] + "/webcomic/id/";
        //                        for (var i = 0; i < comicIDs.length; i++) { // append header to raw comicIDs in comicIDs list
        //                            comicIDs[i] = comicHeader + comicIDs[i];
        //                        }
        //                        res.render('webcomic', { "webcomic": comicIDs, "cells": comicCellIDs });
        //                    });
        //                });
        //            });
        //        });
        //
        //        router.get('/browse/genre/zombies', function (req, res) { // get all comics of comedy genre
        //            var c = new Comic.Comic(req.mongoose);
        //            var cc = new ComicCell.ComicCell(req.mongoose);
        //
        //            c.getZombiesComics((comicObjs: any): void => {
        //                if (comicObjs.length == 0) {
        //                    res.render('webcomic', { "webcomic": new Array<String>(), "cells": new Array<String>() });
        //                    return;
        //                }
        //                c.extractPublishedComicIDs(comicObjs, (comicIDs): void => { // list of raw comicIDs without headers
        //                    var imageHeader = req.headers['host'] + "/webcomic/image/";
        //                    cc.getRepresentativeImages(comicIDs, imageHeader, (comicCellIDs): void => { // list of comicCellIDs with headers
        //                        var comicHeader = req.headers['host'] + "/webcomic/id/";
        //                        for (var i = 0; i < comicIDs.length; i++) { // append header to raw comicIDs in comicIDs list
        //                            comicIDs[i] = comicHeader + comicIDs[i];
        //                        }
        //                        res.render('webcomic', { "webcomic": comicIDs, "cells": comicCellIDs });
        //                    });
        //                });
        //            });
        //        });
        //
        //        router.get('/browse/genre/post_apocalyptic', function (req, res) { // get all comics of drama genre
        //            var c = new Comic.Comic(req.mongoose);
        //            var cc = new ComicCell.ComicCell(req.mongoose);
        //
        //            c.getPostApocalypticComics((comicObjs: any): void => {
        //                if (comicObjs.length == 0) {
        //                    res.render('webcomic', { "webcomic": new Array<String>(), "cells": new Array<String>() });
        //                    return;
        //                }
        //                c.extractPublishedComicIDs(comicObjs, (comicIDs): void => { // list of raw comicIDs without headers
        //                    var imageHeader = req.headers['host'] + "/webcomic/image/";
        //                    cc.getRepresentativeImages(comicIDs, imageHeader, (comicCellIDs): void => { // list of comicCellIDs with headers
        //                        var comicHeader = req.headers['host'] + "/webcomic/id/";
        //                        for (var i = 0; i < comicIDs.length; i++) { // append header to raw comicIDs in comicIDs list
        //                            comicIDs[i] = comicHeader + comicIDs[i];
        //                        }
        //                        res.render('webcomic', { "webcomic": comicIDs, "cells": comicCellIDs });
        //                    });
        //                });
        //            });
        //        });
        //
        //        router.get('/browse/genre/action_adventure', function (req, res) { // get all comics of drama genre
        //            var c = new Comic.Comic(req.mongoose);
        //            var cc = new ComicCell.ComicCell(req.mongoose);
        //
        //            c.getActionAdventureComics((comicObjs: any): void => {
        //                if (comicObjs.length == 0) {
        //                    res.render('webcomic', { "webcomic": new Array<String>(), "cells": new Array<String>() });
        //                    return;
        //                }
        //                c.extractPublishedComicIDs(comicObjs, (comicIDs): void => { // list of raw comicIDs without headers
        //                    var imageHeader = req.headers['host'] + "/webcomic/image/";
        //                    cc.getRepresentativeImages(comicIDs, imageHeader, (comicCellIDs): void => { // list of comicCellIDs with headers
        //                        var comicHeader = req.headers['host'] + "/webcomic/id/";
        //                        for (var i = 0; i < comicIDs.length; i++) { // append header to raw comicIDs in comicIDs list
        //                            comicIDs[i] = comicHeader + comicIDs[i];
        //                        }
        //                        res.render('webcomic', { "webcomic": comicIDs, "cells": comicCellIDs });
        //                    });
        //                });
        //            });
        //        });
        //
        //        router.get('/browse/genre/humor', function (req, res) { // get all comics of drama genre
        //            var c = new Comic.Comic(req.mongoose);
        //            var cc = new ComicCell.ComicCell(req.mongoose);
        //
        //            c.getHumorComics((comicObjs: any): void => {
        //                if (comicObjs.length == 0) {
        //                    res.render('webcomic', { "webcomic": new Array<String>(), "cells": new Array<String>() });
        //                    return;
        //                }
        //                c.extractPublishedComicIDs(comicObjs, (comicIDs): void => { // list of raw comicIDs without headers
        //                    var imageHeader = req.headers['host'] + "/webcomic/image/";
        //                    cc.getRepresentativeImages(comicIDs, imageHeader, (comicCellIDs): void => { // list of comicCellIDs with headers
        //                        var comicHeader = req.headers['host'] + "/webcomic/id/";
        //                        for (var i = 0; i < comicIDs.length; i++) { // append header to raw comicIDs in comicIDs list
        //                            comicIDs[i] = comicHeader + comicIDs[i];
        //                        }
        //                        res.render('webcomic', { "webcomic": comicIDs, "cells": comicCellIDs });
        //                    });
        //                });
        //            });
        //        });
        //
        //        router.get('/browse/genre/superhero', function (req, res) { // get all comics of drama genre
        //            var c = new Comic.Comic(req.mongoose);
        //            var cc = new ComicCell.ComicCell(req.mongoose);
        //
        //            c.getSuperheroComics((comicObjs: any): void => {
        //                if (comicObjs.length == 0) {
        //                    res.render('webcomic', { "webcomic": new Array<String>(), "cells": new Array<String>() });
        //                    return;
        //                }
        //                c.extractPublishedComicIDs(comicObjs, (comicIDs): void => { // list of raw comicIDs without headers
        //                    var imageHeader = req.headers['host'] + "/webcomic/image/";
        //                    cc.getRepresentativeImages(comicIDs, imageHeader, (comicCellIDs): void => { // list of comicCellIDs with headers
        //                        var comicHeader = req.headers['host'] + "/webcomic/id/";
        //                        for (var i = 0; i < comicIDs.length; i++) { // append header to raw comicIDs in comicIDs list
        //                            comicIDs[i] = comicHeader + comicIDs[i];
        //                        }
        //                        res.render('webcomic', { "webcomic": comicIDs, "cells": comicCellIDs });
        //                    });
        //                });
        //            });
        //        });
        module.exports = router;
    };
    return Webcomic;
})();
var webcomic = new Webcomic();
webcomic.startWebcomic();
