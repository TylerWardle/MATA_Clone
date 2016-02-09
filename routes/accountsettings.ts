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
			res.render('account', { "accountsettings": user });
			res.redirect("accountsettings");
		}
		else
		{
			res.send("ACCESS DENIED");
		}
	});
	
});

/* POST Account setttings */
router.post('/', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    // Fetch the document
    registeredUsers.findOne({_id:req.headers['_id']}, function(err, user) {
		if(user)
		{
			if (user.accountType === "viewer") {
				var viewers = db.get('viewers');
				viewers.findOne({_id:req.headers['_id']}, function(err, viewer) {
					if (err) {
						res.send("ACCESS DENIED");
					}
					else
					{
						// need to ask client to give format of data being sent up for account settings..
						// are they only sending updated settings? or all.
					}
				});
			}
			else {
				var contributors = db.get('contributors');
				contributors.findOne({_id:req.headers['_id']}, function(err, contributor) {
					if (err) {
						res.send("ACCESS DENIED");
					}
					else
					{
						// need to ask client to give format of data being sent up for account settings..
						// are they only sending updated settings? or all.
					}
				});
			}	
			res.render('accountsettings', { "accountsettings": user });
			res.redirect("accountsettings");
		}
		else
		{
			res.send("ACCESS DENIED");
		}
	}); 
});

module.exports = router;
