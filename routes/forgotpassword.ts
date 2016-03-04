///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
import RegisteredUser = require('../models/RegisteredUser');
import Viewer = require('../models/Viewer');
import Contributor = require('../models/Contributor');


var express = require('express');
var router = express.Router();


/* GET forgotpassword page. */
router.get('/', function(req, res) 
{
	res.render('forgotpassword', { title: 'Recover Your Account' });
});


/* PUT to  into the system. */
router.post('/', function(req, res) {
console.log("reached");
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    registeredUsers.findOne({username:req.body.username}, function(err, user) {
		if(user)
		{
			res.render('resetpassword', { title: 'Reset Your Password' });
		}	
		else
		{
			res.render("error", { message: "User does not exist" });
		}
	});
});


module.exports = router;