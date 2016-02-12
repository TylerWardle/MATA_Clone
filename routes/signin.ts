///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
import RegisteredUser = require('../models/RegisteredUser');
import Viewer = require('../models/Viewer');
import Contributor = require('../models/Contributor');

var express = require('express');
var router = express.Router();

/* POST to sign into the system. */
router.post('/', function(req, res) {
	
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
	
    registeredUsers.findOne({username:req.body.username}, function(err, user) {
		if(user){
			//res.set('_id', user._id);
			if(user.password === req.body.password){
                res.cookie('_id',user._id);
				if(user.accountType === "contributor"){
                    res.redirect("contributor");
				} else {
                    res.redirect("viewer");
				}
			} else {
				res.send("Username and password do not match.");	
			}
		} else {
			res.send("User does not exist");
		}
	});
});

/* GET register page. */
router.get('/', function(req, res) 
{
    res.clearCookie('_id');
	res.render('signin', { title: 'Sign In!' });
});

module.exports = router;