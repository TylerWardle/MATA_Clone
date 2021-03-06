///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import Comic = require('../models/Comic');
import ComicCell = require('../models/ComicCell');
import RegisteredUser = require('../models/RegisteredUser');
import Contributor = require('../models/Contributor');
import CommentService = require('../services/CommentService');
import VotesServiceProvider = require('../services/VotesServiceProvider');
import FavoritesServiceProvider = require('../services/FavoritesServiceProvider');
import HistoryServiceProvider = require('../services/HistoryServiceProvider');


class Webcomic {

    constructor() { }

    startWebcomic() {

        var express = require('express');
        var router = express.Router();
        var fs = require('fs');
        var ObjectId = require('mongodb').ObjectID;
        var easyimg = require('easyimage');
        var imagemagick = require('imagemagick');
        
        var history = new HistoryServiceProvider.HistoryServiceProvider();

        // View comic with associated images (one image/comic for now)
        // TODO: image does not display correctly!!
        router.get('/id/:id', function (req, res) {
            // get web comic id from reqest parameter in the URL
            var comicID = req.params.id;
            var db = req.db;
            var registeredUsers = db.get('registeredUsers');
            
            history.addWebComicLinkToList(req, res, comicID);
            
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
                        var votedPpl = doc.votedPpl;
                        var fave = doc.fave;
                        var vv = false;
                        var uu = null;
                        var favb = false;
                        for (var j = 0, len = fave.length; j < len; j++){
                            if(fave[j]==user.username){
                                favb = true;
                                break;
                            }
                        }
                        for (var i = 0, len = votedPpl.length; i<len; i++){
                            if (votedPpl[i].id==user.username){
                                vv = true;
                                uu = votedPpl[i];
                                break;
                            }
                        }
                        console.log(fave);
                        console.log(user.ids)
                        cc.getAll(comicID, (docs: any): void => {

                            //get comments
                            var commentService = new CommentService.CommentService(req, res);
                            commentService.getAll(comicID, (comments: any): any => {
                                res.render('webcomic', { "user": user, 
                                                         "webcomic": doc, 
                                                         "vv": vv,
                                                         "uu": uu,
                                                         "cells": docs, 
                                                         "header": req.headers['host'] + "/webcomic/image/", 
                                                         "isAuthor": isAuthor, 
                                                         "accountType": req.cookies.accountType,
                                                         "favb": favb,
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

        router.post('/id/:id', function(req, res) {
	// get web comic id from reqest parameter in the URL
            var comicID = req.params.id;
            var c = new Comic.Comic(req.mongoose);
            // extract username of owner of comic from the request header
            var db = req.db;
            var registeredUsers = db.get('registeredUsers');
            var contributors = db.get('contributors');
            console.log(req.body);
            registeredUsers.findOne({ _id: req.cookies._id }, function(err, user) {

                // extract values of ll the comic data fields 
                c.get(comicID, (webcomic: any): void => {

                    var title = webcomic.title;
                    var toPublish = webcomic.toPublish;
                    var publicationDate = webcomic.publicationDate;
                    var description = webcomic.description;
                    var genre = webcomic.genre;
                    var authorID = webcomic.authorID;
                    var authorUsername = webcomic.authorUsername;
                    var openToContribution = webcomic.openToContribution;
                    var openToCommenting = webcomic.openToCommenting
                    var thumbnailID = webcomic.thumbnailID;
                    var upvotes = webcomic.upvotes;
                    var votedPpl = webcomic.votedPpl;
                    var fave = webcomic.fave;
                    console.log(fave);
                    var vv = false;
                    var uu = null;
                    var favb = false;
                    // checking to see if a user is in votedPpl (users who have already voted cannot vote again)
                    for (var i = 0, len = votedPpl.length; i<len; i++){
                        if (votedPpl[i].id==user.username){
                            vv = true;
                        }
                    }

                    // checking to see if a user is in fave (has already voted)
                    for (var j = 0, len = fave.length; j < len; j++){
                            if(fave[j]==user.username){
                                favb = true ;
                                break;
                            }
                        }
                    // upvoting or downvoting in a webcomic. users can only vote once
                    if (req.param('op_u')&&vv==false) {
                        upvotes++;
                        votedPpl.push({ id: user.username, votetype: 1 });
                        
                    }
                    else if (req.param('op_d')&&vv==false) {
                        upvotes--;
                        votedPpl.push({ id: user.username, votetype: -1 });
                        
                    }
                    // updating favorites in registeredUser when the comic is favorited/unfavorited

                    if (req.param('fav') && favb==false) {
                        fave.push(user.username);
                    }
                    else if (req.param('unfav') && favb) {
                        fave.pull(user.username); 
                    }

                    // update the comic
                    c.update(comicID, title, authorID, authorUsername, publicationDate, description, genre, toPublish, openToContribution, openToCommenting, thumbnailID, upvotes, votedPpl,fave, (): void => {
                        // redirect client to updated comic web page
                        var cc = new ComicCell.ComicCell(req.mongoose);
                        //used to inform the client if the user is the author of a webcomic they are viewing
                        var isAuthor = false;
                        if (req.cookies._id == webcomic.authorID) {
                            isAuthor = true
                        }
                        cc.getAll(comicID, (docs: any): void => {
                            res.redirect('/webcomic/id/' + comicID);
                            /*/res.render('webcomic', { "user": user, 
                                                     "webcomic": webcomic, 
                                                     "cells": docs, 
                                                     "header": req.headers['host'] + "/webcomic/image/", 
                                                     "isAuthor": isAuthor, 
                                                     "accountType": req.cookies.accountType});/*/
                        });
                    });
                });
            });  
        });
        
        // Create new comic with associated images (one  image/comic for now) **WORKS**
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
            var votedPpl: [{ id: String, votetype: Number }] = [{ id: "", votetype: 0 }];
            var openToContribution;
            var openToCommenting;
            var thumbnailID = "";
            var upvotes: Number = 0;
            var fave: [String] = [""];
            var selectedImageID = req.body.selectedImageID;
            
            if (req.body.openToContribution == "on"){
                openToContribution = true;
            } else {
                openToContribution = false;
            }
            if (req.body.openToCommenting == "on"){
                openToCommenting = true;
            } else {
                openToCommenting = false;
            }
            //set the toPublish field relative to which submit button is pushed
            if (req.body.submit == "draft"){
                toPublish = false;
            } else if(req.body.submit == "publish"){
                toPublish = true;
            }
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);
            if(req.file){
                fs.readFile(req.file.path, function (err, img) {
                    c.insert(title, authorID, authorUsername, description, genre, toPublish, openToContribution, openToCommenting, thumbnailID, upvotes,votedPpl,fave, (comicID: String): void => {
    
                    // read the image file passed in the request and save it
                        cc.insert(comicID, authorID, authorID, toPublish, (imgName: String): void=> {
                            // If there's an error
                            if (!imgName) {
                                console.log("There was an error")
                                res.redirect("./create");
                                res.end();
                            } else {
                                //var newPath = "./uploads/fullsize/" + imgName;
                                c.update(comicID, title, authorID, authorUsername, publicationDate, description, genre, toPublish, openToContribution, openToCommenting, imgName, upvotes,votedPpl,fave, (): void => {});
                                var newPath = "./uploads/fullsize/" + imgName;
                                //var imageList = [(req.headers['host'] + "/webcomic/image/" + imgName)];
                        
                                // write image file to uploads/fullsize folder
                                fs.writeFile(newPath, img, function (err) {
                                    if (err)
                                        return console.error(err);
                                    //redirect to the newly created comic
                                    res.redirect('./id/' + comicID);
                                });
                                easyimg.rescrop({
                                    src: newPath, dst:'./uploads/thumbnails/' + imgName,
                                    width:128, height:128,
                                    //cropwidth:128, cropheight:128,
                                    x:0, y:0
                                    }).then(
                                    function(image) {
                                        console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                                    );
                            }
                            
                            var db = req.db;
                            var contributors = db.get('contributors');
                            contributors.update({ guid: ObjectId(req.cookies._id) }, {
                                $addToSet: {
                                    comicIDs: [comicID]
                                }
                            });
                            
                        });
                    });        
                });
            }else{
                var db = req.db;
                var comicCells = db.get('comiccells');
                c.insert(   title, 
                            authorID, 
                            authorUsername, 
                            description, 
                            genre, 
                            toPublish, 
                            openToContribution, 
                            openToCommenting,
                            selectedImageID, 
                            upvotes,
                            votedPpl,
                            fave,
                            (comicID: String): void => {
                                comicCells.update({_id:ObjectId(selectedImageID)}, {$push: {comicID : comicID}}); 
                                res.redirect('./id/' + comicID);   
                            });
            }
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
                            easyimg.rescrop({
                                    src: newPath, dst:'./uploads/thumbnails/' + imgName,
                                    width:128, height:128,
                                    //cropwidth:128, cropheight:128,
                                    x:0, y:0
                                    }).then(
                                    function(image) {
                                        console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                                    );
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
        
        // get an image stored in uploads/thumbnail/    
        router.get('/thumbnail/:file', function (req, res) {
            var file = req.params.file;
            var img = fs.readFileSync("./uploads/thumbnails/" + file);
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
            var openToCommenting;
            var thumbnailID;
            var upvotes;
            var votedPpl;
            var fave;
            
            if (req.body.openToContribution == "on"){
                openToContribution = true;
            } else {
                openToContribution = false;
            }
            if (req.body.openToCommenting == "on"){
                openToCommenting = true;
            } else {
                openToCommenting = false;
            }

            if (!openToCommenting) {
                var commentService = new CommentService.CommentService(req, res);
                commentService.deleteAll(comicID, authorID, (isDeleted: boolean): any => {

                    //set the toPublish field relative to which submit button is pushed
                    if (req.body.submit == "publish") {
                        toPublish = true;
                    }

                    // update the comic
                    var c = new Comic.Comic(req.mongoose);

                    c.update(comicID, title, authorID, authorUsername, publicationDate, description, genre, toPublish, openToContribution, openToCommenting, thumbnailID, upvotes, votedPpl, fave, (): void => {
                        // redirect client to updated comic web page
                        res.redirect('/webcomic/id/' + comicID);
                    });
                });
            }
            else{
                    //set the toPublish field relative to which submit button is pushed
                    if (req.body.submit == "publish") {
                        toPublish = true;
                    }

                    // update the comic
                   var c = new Comic.Comic(req.mongoose);

                    c.update(comicID, title, authorID, authorUsername, publicationDate, description, genre, toPublish, openToContribution, openToCommenting, thumbnailID, upvotes, votedPpl, fave ,(): void => {
                        // redirect client to updated comic web page
                        res.redirect('/webcomic/id/' + comicID);
                    });
            }
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
            var db = req.db;
            var comicCells = db.get('comiccells');
          
            //comicCells.find({toPublish: true}, {sort: {_id:1},limit:20}, function(err, comicCells){
            comicCells.find({}, {sort: {_id:-1},limit:20}, function(err, comicCells){    
                res.render('createwebcomic', { title: 'Create a Comic!' , "comicCells": comicCells, "header": req.headers['host']});
            });                
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