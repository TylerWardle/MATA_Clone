 ///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>

/* This router is responsible for updating the global chat.*/
class Chat {

    constructor() { }

    startChat() {
		var express = require('express');
		var router = express.Router();


		/* POST a new chat message */
		router.post('/', function (req, res) {
			
		});

		/* GET chat history */
		router.get('/', function (req, res) {
		
		});


		/* GET flag check for new chats */
		router.get('/status', function (req, res) {
			// returns the current number of message in the chat .

		});
		
		
		/* GET the last n  entries?*/
		router.get('/status', function (req, res) {
			// returns the current number of message in the chat .

		});
		module.exports = router;
	}
}


var chat = new Chat();
chat.startChat();