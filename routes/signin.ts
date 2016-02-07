///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
import RegisteredUser = require('../models/RegisteredUser');
import Viewer = require('../models/Viewer');
import Contributor = require('../models/Contributor');

var express = require('express');
var router = express.Router();

/* POST to sign into the system. */
router.post('/', function(req, res) {
	
    // Set our internal DB variable
    var db = req.db;

    // Set our collection
    var registeredUsers = db.get('registeredUsers');
		
	 // Fetch the document
    registeredUsers.findOne({username:req.body.username}, function(err, user) {
		if(user)
		{
			res.set('_id', user._id);
			if(user.password === req.body.password)
			{
				if(user.accountType === "Contributor")
				{
					res.render('contributor', { title: 'Welcome back!'});	
				}
				else
				{
					res.render('viewer', { title: 'Welcome back!'});
				}
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

/* GET register page. */
router.get('/', function(req, res) 
{
	res.render('signin', { title: 'Sign In!' });
});

module.exports = router;