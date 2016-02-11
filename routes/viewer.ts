///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
//<reference path='../types/DefinitelyTyped/mongodb/mongodb-1.4.9.d.ts'/>
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>


var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


/* GET Viewers homepage. */
router.get('/', function(req, res, db) {
	var db = req.db;
	var viewers = db.get('viewers');
    var comicsList = "test,test"
    
	viewers.findOne({guid: ObjectID(req.cookies._id)}, function(error, viewer)
	{
		res.render('viewer', {"viewer": viewer, "comicsList": comicsList});
	});
});

module.exports = router;
