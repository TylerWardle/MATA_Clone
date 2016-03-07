///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
/* GET Viewers homepage. */
router.get('/', function (req, res, db) {
    var db = req.db;
    var viewers = db.get('viewers');
<<<<<<< HEAD
    var ComicCollection = db.get('ComicCollection');
    //var comicsList= new Array<string>();
    var comicsList;
    var cursor = ComicCollection.find({});
    cursor.each(function (err, doc) {
        var tempStr = "https://fast-beach-12058.herokuapp.com/webcomic/id/" + doc._id + ",";
        comicsList += tempStr;
        //comicsList.push(s);
    });
    viewers.findOne({ guid: ObjectID(req.cookies._id) }, function (error, viewer) {
=======
    var comicsList = "https://fast-beach-12058.herokuapp.com/webcomic/id/56bac1a83da2ef110089f60e, https://fast-beach-12058.herokuapp.com/webcomic/id/56bac1a83da2ef110089f60f";
    viewers.findOne({ guid: ObjectID(req.cookies._id) }, function (error, viewer) {
        console.log("this should display something: " + comicsList);
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
        res.render('viewer', { "viewer": viewer, "comicsList": comicsList });
    });
});
module.exports = router;
