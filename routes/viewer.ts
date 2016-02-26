///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


/* GET Viewers homepage. */
router.get('/', function(req, res, db) {
	var db = req.db;
	var viewers = db.get('viewers');
	var ComicCollection = db.get('ComicCollection');
   
	//var comicsList= new Array<string>();

	var comicsList: new string;
    var cursor = ComicCollection.find({});
    cursor.each(function(err, doc) {
    	string temp = "https://fast-beach-12058.herokuapp.com/webcomic/id/" + doc._id + ",";
    	comicsList += temp;
    	//comicsList.push(s);
    });

	viewers.findOne({guid: ObjectID(req.cookies._id)}, function(error, viewer) {
		res.render('viewer', {"viewer": viewer, "comicsList": comicsList});
	});
});

module.exports = router;