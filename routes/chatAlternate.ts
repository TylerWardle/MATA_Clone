 ///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>
import ChatClient = require('../models/ChatClient');


/* This router is responsible for updating the global chat.*/
class ChatAlternate {
	
    constructor() { }

    startChat() {
		var express = require('express');
		var router = express.Router();
        var CHAT_TIME_OUT = 5000;
		
		
		/* POST a new chat message */
		router.post('/', function (req, res) {
            //initialize the singelton
            var client = new ChatClient.ChatClient(req.mongoose);
            
            var db = req.db;
            var clients = db.get('clients');
			var username = req.cookies.userName;
			var message = req.body.chatMessage;
            
         
            clients.update({_id:1}, {$push: {messages : {  message: message, 
                                                           userName: username, 
                                                           date: Date() }}});
            
            clients.update({_id:1}, {$set: {lastMessageDate : Date()}});
            
         
            res.json(message);
		});

		/* GET chat history */
		router.get('/', function (req, res) {
            //initialize the singelton
            var client = new ChatClient.ChatClient(req.mongoose);
            
            var db = req.db;
            var clients = db.get('clients');
            
            
            clients.find({}, function(err, history){
                var currentTime = new Date();
                var lastChat = new Date(history[0].lastMessageDate);
                var timeDiff = Math.abs(currentTime.getTime() - lastChat.getTime());
                
                //console.log(timeDiff);
                
                //if(timeDiff < this.CHAT_TIME_OUT){
			         res.json(history[0].messages);
                //}else{
                    res.json();
                //}
            });
            
            
		});
		
		module.exports = router;
	}
}


var chatAlternate = new ChatAlternate();
chatAlternate.startChat();