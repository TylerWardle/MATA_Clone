///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


/* GET Viewers homepage. */
router.get('/', function(req, res, db) {
	var db = req.db;
	var viewers = db.get('viewers');
    var comicsList = "https://fast-beach-12058.herokuapp.com/webcomic/id/56bac1a83da2ef110089f60e, https://fast-beach-12058.herokuapp.com/webcomic/id/56bac1a83da2ef110089f60f";

	viewers.findOne({guid: ObjectID(req.cookies._id)}, function(error, viewer)
	{
		console.log("this should display something: " + comicsList);
		res.render('viewer', {"viewer": viewer, "comicsList": comicsList});
	});
});

module.exports = router;
