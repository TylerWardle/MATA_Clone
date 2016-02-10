///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
//<reference path='../types/DefinitelyTyped/mongodb/mongodb-1.4.9.d.ts'/>
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>


var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


/* GET Contributors homepage. */
router.get('/', function(req, res) {
	var db = req.db;
    var contributors = db.get('contributors');
	contributors.findOne({guid: ObjectID(req.cookies._id)}, function(error, contributor)
	{
        if(contributor.comics.length > 0){
        var link = req.headers['host'] + "/webcomic/id/" + contributor.comics[0];
        }
		res.render('contributor',{"contributor": contributor, "link": link});		
	});
});

module.exports = router;