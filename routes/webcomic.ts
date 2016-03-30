///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import Comic = require('../models/Comic');
import ComicCell = require('../models/ComicCell');
import RegisteredUser = require('../models/RegisteredUser');
import Contributor = require('../models/Contributor');

import CommentService = require('../services/CommentService');

class Webcomic {

    constructor() { }

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
            var db = req.db;
            var registeredUsers = db.get('registeredUsers');
            
            registeredUsers.findOne({ _id: req.cookies._id }, function(err, user) {
           
            // get comic from the db
                if (req.cookies._id != null) {
                    var c = new Comic.Comic(req.mongoose);
                    c.get(comicID, (doc: any): void => {
                        var cc = new ComicCell.ComicCell(req.mongoose);
                        //used to inform the client if the user is the author of a webcomic they are viewing
                        var isAuthor = false;
                        if (req.cookies._id == doc.authorID) {
                            isAuthor = true
                        }
                        cc.getAll(comicID, (docs: any): void => {
                            //get comments
                            var commentService = new CommentService.CommentService(req, res);
                            commentService.getAll(comicID, (comments: any): any => {
                                res.render('webcomic', { "user": user, 
                                                         "webcomic": doc, 
                                                         "cells": docs, 
                                                         "header": req.headers['host'] + "/webcomic/image/", 
                                                         "isAuthor": isAuthor, 
                                                         "accountType": req.cookies.accountType,
                                                         "comments": comments});
                            });
                        });

                    });
                }
                else {
                    res.redirect('/');
                }
            });

        });
        
        // Create new comic with associated images (one image/comic for now) 
        router.post('/submit', function(req, res) {
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
            if (req.body.openToContribution == "on"){
                openToContribution = true;
            } else {
                openToContribution = false;
            }
            //set the toPublish field relative to which submit button is pushed
            if (req.body.submit == "draft"){
                toPublish = false;
            } else if(req.body.submit == "publish"){
                toPublish = true;
            }
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);
            var commentService = new CommentService.CommentService(req, res);
            fs.readFile(req.file.path, function (err, img) {

                c.insert(title, authorID, authorUsername, description, genre, toPublish, openToContribution, thumbnailID, (comicID: String): void => {

                    // read the image file passed in the request and save it
                    cc.insert(comicID, authorID, authorID, toPublish, (imgName: String): void=> {
                        // If there's an error
                        if (!imgName) {
                            console.log("There was an error")
                            res.redirect("./create");
                            res.end();
                        } else {
                            //var newPath = "./uploads/fullsize/" + imgName;
                            c.update(comicID, title, authorID, authorUsername, publicationDate, description, genre, toPublish, openToContribution, imgName, (): void => {});
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

        router.post('/newCell/:id', function(req,res){
            // extract comic id from request header
            var comicID = req.params.id;
            //console.log(comicID);
            // extract the colaborators id from the cookie
            var collaboratorUsername = req.cookies._id;
            var c = new Comic.Comic(req.mongoose);
            
            
            c.get(comicID, (webcomic: any): void => {
            
                var title = webcomic.title;
                var authorUsername = webcomic.authorUsername;
                var toPublish = webcomic.toPublish;
                
                fs.readFile(req.file.path, function (err, img) { 
                    var cc = new ComicCell.ComicCell(req.mongoose);
                    cc.insert(comicID, authorUsername, collaboratorUsername, toPublish, (imgName: String): void=> {
                        // If there's an error
                        if (!imgName) {
                            console.log("There was an error")
                            res.redirect("./create");
                            res.end();
                        }else {
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
            if (req.body.openToContribution == "on"){
                openToContribution = true;
            } else {
                openToContribution = false;
            }
            //set the toPublish field relative to which submit button is pushed
            if (req.body.submit == "publish"){
                toPublish = true;
            }

            // update the comic
            var c = new Comic.Comic(req.mongoose);

            c.update(comicID, title, authorID, authorUsername, publicationDate, description, genre, toPublish, openToContribution, thumbnailID, (): void => {
                // redirect client to updated comic web page
                res.redirect('/webcomic/id/' + comicID);
            });
        });

        // Retrieve old comic fields to edit on 
        router.get('/edit/:id', function (req, res) {
            var comicID = req.params.id;

            var c = new Comic.Comic(req.mongoose);
            c.get(comicID, (doc: any): void => {
                res.render('webcomicedit', { "webcomic": doc });
            });
        });


        // Delete Comic: Delete one comic and all associated cells 
        router.post('/delete/:id', function (req, res) {
			// get comicID identifying which comic to delete from reqest parameter in the URL
            var comicID = req.params.id; 
            var authorID = req.cookies._id;
        
            // Remove this comic document
            var commentService = new CommentService.CommentService(req, res);
            commentService.deleteAll(comicID, authorID, (isDeleted: boolean): any => {
            var c = new Comic.Comic(req.mongoose);
                c.delete(comicID, authorID, (): void => {
                    // remove associated comic cell documents
                    var cc = new ComicCell.ComicCell(req.mongoose);
                    cc.deleteAll(comicID, authorID, (): void => { 
                        
    					var header = req.headers['host'];
    					res.redirect("http://"+header+"/contributor");
    				});
                });
            });
        });

        // create a webcomic route
        router.get('/create', function (req, res) {
            res.render('createwebcomic', { title: 'Create a Comic!' });
        });

        // make a route for get random webcomic ID 
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
                //var randomArrIndex = Math.floor(Math.random() * (max - min + 1) + min);
                var randomArrIndex = Math.floor(Math.random() * (max - min) + min);

                if (randomArrIndex < 0) {
                    res.render("error", { message: "No webcomics found." });
                } else {
                    res.redirect('/webcomic/id/' + comicIDArr[randomArrIndex].toString());
                }
            });
        });

        module.exports = router;
    }
}

var webcomic = new Webcomic();
webcomic.startWebcomic();