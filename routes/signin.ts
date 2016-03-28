///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
import RegisteredUser = require('../models/RegisteredUser');
import Viewer = require('../models/Viewer');
import Contributor = require('../models/Contributor');
import GlobalChat = require('../models/GlobalChat');


class Signin {

    constructor() { }

    startSignin() {
		var express = require('express');
		var router = express.Router();
		
		var globalChat = GlobalChat.GlobalChat.getInstance();

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
					// add the user to the global chat
					globalChat.addUserToChat(req.body.username);
					
					//res.set('_id', user._id);
					if(user.password === req.body.password){
					
						// Update the login time
						registeredUsers.update({username:req.cookies._username},
										   {
												$set:
												{
													"lastLogin":(new Date()).toDateString()
												}
										   });
										   
						res.cookie('_id',user._id);
						res.cookie('accountType',user.accountType);
						res.cookie('userName',user.username);
						if(user.accountType === "contributor"){
							res.redirect("contributor");
						}
						else
						{
							res.redirect("viewer");
						}
					}
					else
					{
						res.render("error", { message: "Username and password do not match." });	
					}
				}
				else
				{
					res.render("error", { message: "User does not exist" });
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
		}
	}
	
var signin = new Signin();
signin.startSignin();