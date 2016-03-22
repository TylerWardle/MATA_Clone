 ///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>

class Chat {

    constructor() { }

    startChat() {
		var express = require('express');
		var router = express.Router();
		var ObjectID = require('mongodb').ObjectID;


		/* POST a new chat message */
		router.post('/', function (req, res) {
			var db = req.db;
			var registeredUsers = db.get('registeredUsers');
		});

		/* GET chat history */
		router.get('/', function (req, res) {
			var db = req.db;
			var registeredUsers = db.get('registeredUsers');
		});


		/* GET flag check for new chats */
		router.get('/status', function (req, res) {
			var db = req.db;
			var registeredUsers = db.get('registeredUsers');

		});
		module.exports = router;

		}
	}


var chat = new Chat();
chat.startChat();