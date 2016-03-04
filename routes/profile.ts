///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
//<reference path='../types/DefinitelyTyped/mongodb/mongodb-1.4.9.d.ts'/>
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>


var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


/* GET  Profile settings. */
router.get('/', function(req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
	
	 // Fetch the document
    registeredUsers.findOne({_id:ObjectID(req.cookies._id)}, function(err, user) {
		if(user)
		{		
			res.render('profile', { "user": user });
			//res.redirect("profile");
		}
		else
		{
			res.send("ACCESS DENIED");
		}
	});
	
	
});

router.get('/edit',function(req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    registeredUsers.findOne({_id:ObjectID(req.cookies._id)}, function(err, user) {
            //res.render('profileEdit', {"user":user});
            res.send("Nothing here yet");
    });
});

module.exports = router;
