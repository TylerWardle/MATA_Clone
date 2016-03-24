///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

/* This router is responsible for storing and retreving user history. 
	For now only  all history will be stored. */
class History {

    constructor() { }

    startHistory() {
		var express = require('express');
		var router = express.Router();


		/* POST Subscribe to a contributor. */
		router.post('/', function (req, res) {
			var db = req.db;
			var registeredUsers = db.get('registeredUsers');
		});



		/* Delete unsubscribe to a contributor. */
		router.delete('/', function (req, res) {
			var db = req.db;
			var registeredUsers = db.get('registeredUsers');

		});
		module.exports = router;


		}
	}
	
var history = new History();
history.startHistory();