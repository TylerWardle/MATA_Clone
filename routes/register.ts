///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
import RegisteredUser = require('../models/RegisteredUser');
import Viewer = require('../models/Viewer');
import Contributor = require('../models/Contributor');

var express = require('express');
var router = express.Router();

/* POST register (adds a new user to the system). */
router.post('/', function(req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
	
    registeredUsers.findOne({username:req.body.username}, function(err, item) {
		if(item){
			res.render("error", { message: "username " + item.username + " is already taken!" });
			//send back a signal
		} else{
			
			var username = req.body.username;
			var firstName = req.body.firstName;
			var lastName = req.body.lastName;
			var accountType = req.body.accountType;
			var password = req.body.password;
			console.log("request headers " + req.headers);
			// need to add registered user number to different types of users.
			
			//var registeredUser = new RegisteredUser.RegisteredUser(username, password, firstName, lastName, accountType);
				
			registeredUsers.insert({
				"username": req.body.username,
				"firstName": req.body.firstName,
				"lastName": req.body.lastName,
				"accountType": req.body.accountType,
				"password": req.body.password
				
			}, function(err, doc) {
				if (err) {
					res.render("error", { message: "There was a problem adding the information to the database.1"});
				} else 
				{
					if(accountType === "viewer")
					{
						var viewers = db.get('viewers');
						//var newViewer = new Viewer(username, password, firstName, lastName, accountType);
						
						viewers.insert({
						"username": doc.username,
						"firstName": doc.firstName,
						"lastName": doc.lastName,
						"guid": doc._id
							
						}, function(err, doc) {
							if (err) {
								res.render("error", { message: "There was a problem adding the information to the database.2" });
							}
						})
					}
					else
					{
						var contributors = db.get('contributors');
						//var newContributor = new Contributor(username, password, firstName, lastName, accountType);
					
						contributors.insert({						
							"username": doc.username,
							"firstName": doc.firstName,
							"lastName": doc.lastName,
							"guid": doc._id
							
						}, function(err, doc) {
							if (err) {
								res.render("error", { message: "There was a problem adding the information to the database.3"});
							} 
						})
					}
					res.redirect("signin");
				}
			})
			
			
		}
	});
});

/* GET register page. */
	router.get('/', function(req, res) {
	res.render('register', { title: 'Register!' });
});

module.exports = router;