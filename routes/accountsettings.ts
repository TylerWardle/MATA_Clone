///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>


var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


/* GET  Account settings. */
router.get('/', function(req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
	
	 // Fetch the document
    registeredUsers.findOne({_id:req.headers['_id']}, function(err, user) {
		if(user)
		{
			if(user.password === req.body.password)
			{
				res.render('account', { "accountsettings": user });
				
			}
			else
			{
				res.send("Username and password do not match.");	
			}
		}
		else
		{
			res.send("User does not exist");
		}
	});
	
});

module.exports = router;
