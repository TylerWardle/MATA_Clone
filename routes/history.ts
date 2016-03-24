///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

/* This router is responsible for storing and retreving user history. 
	For now only  all history will be stored. */
class ViewingHistory {

    constructor() { }

    startViewingHistory() {
		var express = require('express');
		var router = express.Router();


		/* POST add a webcomic id to the users history list */
		router.post('/', function (req, res) {
			var db = req.db;
			var registeredUsers = db.get('registeredUsers');
			
			// when user got
		});



		/* GET the history of webcomics a user has  */
		router.get('/', function (req, res) {
			var db = req.db;
			var registeredUsers = db.get('registeredUsers');

		});
		module.exports = router;


		}
	}
	
var viewingHistory = new ViewingHistory();
viewingHistory.startViewingHistory();