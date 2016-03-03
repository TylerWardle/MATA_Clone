///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var Comic = require('../models/Comic');
var ComicCell = require('../models/ComicCell');
var Webcomic = (function () {
    function Webcomic() {
        this.c = new Comic.Comic();
        this.cc = new ComicCell.ComicCell();
    }
    Webcomic.prototype.startWebcomic = function () {
        var express = require('express');
        var router = express.Router();
        var fs = require('fs');
        // View Comic: Get from Comic and Cells from DB 
        router.get('/id/:id', function (req, res) {
            var _this = this;
            // get web comic id from reqest parameter in the URL
            var comicID = req.params.id;
            if (req.cookies._id != null) {
                //retrieve comic data from the DB
                var a_comic = this.c.get(comicID, function (doc) {
                    //retrieve comic cells from the DB
                    var comiccells = _this.cc.getAll(comicID, function (docs) {
                        // render the webcomic
                        res.render('webcomic', { "webcomic": webcomic });
                        // iterate through comic cells and render them
                        docs.forEach(function (docs) {
                            var imageName = docs._id;
                            var img = fs.readFileSync("./uploads/fullsize/" + imageName);
                            res.writeHead(200, { 'Content-Type': 'image/jpg' });
                            res.end(img, 'binary');
                        });
                    });
                });
            }
            else {
                res.redirect('/');
            }
        });
        // Create Comic: Insert comic and cells into DB 
        router.post('/submit', function (req, res) {
            // extract user id of creator/owner of comic from request header
            var authorID = req.cookies._id;
            // get values of comic data fields
            var title = req.body.title;
            var publicationDate = req.body.publicationDate;
            var description = req.body.description;
            var genre = req.body.genre;
            var toPublish = req.body.toPublish;
            var collaboratorID = req.body.collaboratorID;
            // save comic to DB and retrieve comicID
            this.c.insert(authorID, title, publicationDate, description, genre, toPublish, function (comicID) {
                // read the image file passed in the request and save it
                fs.readFile(req.file.path, function (err, data) {
                    console.log(data);
                    // insert comic cell into the DB and use the DB auto-generated ID as the new unique image name
                    var imageName = this.cc.insert(comicID, authorID, collaboratorID, toPublish, function (imageName) {
                        // If there's an error
                        if (!imageName) {
                            console.log("There was an error");
                            res.redirect("./create");
                            res.end();
                        }
                        else {
                            var newPath = "./uploads/fullsize/" + imageName;
                            var imageList = [(req.headers['host'] + "/webcomic/image/" + imageName)];
                            // write image file to uploads/fullsize folder
                            fs.writeFile(newPath, data, function (err) {
                            });
                        }
                        // add comicID to Contributors Model
                        // TODO: need to change below code to reflect mongoose operations instead of mongodb
                        var db = req.db;
                        var contributors = db.get('contributors');
                        var ObjectId = require('mongodb').ObjectID;
                        contributors.update({ guid: ObjectId(req.cookies._id) }, {
                            $addToSet: {
                                "comics": [comicID]
                            }
                        });
                    });
                    //redirect to the newly created comic
                    res.redirect('./id/' + comicID);
                });
            });
        });
        /*
        // get an image stored in uploads/fullsize/
        router.get('/image/:imageName', function (req, res) {
            var imageName = req.params.imageName;
            var img = fs.readFileSync("./uploads/fullsize/" + imageName);
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(img, 'binary');

        });


        // Edit Comic: Update Comic
        router.put('/update/:id', function (req, res) {
            // get web comic id from reqest parameter in the URL
            var comicID = req.params.id;
            // extract user id of creator/owner of comic from request header
            var authorID = req.cookies._id;
            // extract values of all the comic data fields incl. ones to be updated
            var title = req.body.title;
            var description = req.body.description;
            var genre = req.body.genre;
            var toPublish = req.body.toPublish;

            // make a comic object to update/store into the DB
            this.c.update(comicID, authorID, title, description, genre, toPublish, comicUpdateCallback);
            
            // redirect client to updated comic web page
            res.redirect('/webcomic/id/' + comicID);
        });

        // TODO: update comic cell

        // Get Comic for Edit Page
        router.get('/edit/:id', function (req, res) {
            var db = req.db;
            var ComicCollection = db.get('ComicCollection');
            var comicID = req.params.id;
            
            // find comic in the db table
            ComicCollection.findOne({ _id: ObjectId(comicID) }, function (err, webcomic) {
                res.render('webcomicedit', { "webcomic": webcomic });
            });

        });

        // Delete Comic: Delete from ComicCollection and ComicCellCollection in DB
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

        router.get('/create', function (req, res) {
            res.render('createwebcomic', { title: 'Create a Comic!' });
        });
        */
        module.exports = router;
    };
    return Webcomic;
})();
var webcomic = new Webcomic();
webcomic.startWebcomic();
//# sourceMappingURL=webcomic.js.map