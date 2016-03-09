///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
import RegisteredUser = require('../models/RegisteredUser');
import Viewer = require('../models/Viewer');
import Contributor = require('../models/Contributor');

var express = require('express');
var router = express.Router();
var registeredUserServiceProvider = new RegisteredUserServiceProvider();

/* POST register (adds a new user to the system). */
router.post('/', function(req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
	
	if(registeredUserServiceProvider.create(registeredUsers, req,res))
		res.redirect("signin");
	
});

/* GET register page. */
	router.get('/', function(req, res) {
	res.render('register', { title: 'Register!' });
});

module.exports = router;