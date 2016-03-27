///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 


class Home {

    constructor() { }

    startHome() {

		var express = require('express');
		var router = express.Router();
		var ObjectID = require('mongodb').ObjectID;


		/* GET registered users homepage. */
		router.get('/', function(req, res, db) {
			//console.log("Reached");
			var db = req.db;
			var registeredUsers = db.get('registeredUsers');
			
			registeredUsers.findOne({_id: ObjectID(req.cookies._id)}, function(error, user)
			{
				if(user.accountType == 'viewer'){
					 res.redirect('viewer');

				}else{
					res.redirect('contributor');  
				}
			});
		});

		module.exports = router;
		
		}
	}
	
var home = new Home();
home.startHome();



