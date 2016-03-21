
///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import RegisteredUser = require('../models/RegisteredUser');
import Viewer = require('../models/Viewer');
import Contributor = require('../models/Contributor');
import RSProvider = require('../services/RegisteredUserServiceProvider');

class Register {

    constructor() { }

    startRegister() {

		var express = require('express');
		var router = express.Router();
		var registeredUserServiceProvider = new RSProvider.RegisteredUserServiceProvider();

		/* POST register (adds a new user to the system). */
		router.post('/', function(req, res) {

			if(registeredUserServiceProvider.create(req, res))
			{
				res.redirect("signin");
			}
			else
			{
				res.render("error", { message: "username " + req.body.username+ " is already taken!" });
			}
		});

		/* GET register page. */
			router.get('/', function(req, res) {
			res.render('register', { title: 'Register!' });
		});

		module.exports = router;
		
		}
	}
	
var register = new Register();
register.startRegister();