///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var ChatClient = require('../models/ChatClient');
/* This router is responsible for updating the global chat.*/
var ChatAlternate = (function () {
    function ChatAlternate() {
    }
    ChatAlternate.prototype.startChat = function () {
        var express = require('express');
        var router = express.Router();
        //var CHAT_TIME_OUT = 10000;
        /* POST a new chat message */
        router.post('/', function (req, res) {
            //initialize or get the singelton
            var client = ChatClient.ChatClient.getInstance(req.mongoose);
            var db = req.db;
            var clients = db.get('clients');
            var username = req.cookies.userName;
            var message = req.body.chatMessage;
            clients.update({ _id: 1 }, { $push: { messages: { message: message,
                        userName: username,
                        date: Date() } } });
            clients.update({ _id: 1 }, { $set: { lastMessageDate: Date() } });
            res.json(message);
        });
        /* GET chat history */
        router.get('/', function (req, res) {
            //initialize or get the singelton
            var client = ChatClient.ChatClient.getInstance(req.mongoose);
            var db = req.db;
            var clients = db.get('clients');
            clients.find({}, function (err, history) {
                var currentTime = new Date();
                var lastChat = new Date(history[0].lastMessageDate);
                var timeDiff = Math.abs(currentTime.getTime() - lastChat.getTime());
                res.json(history[0].messages);
            });
        });
        //Check to see if there have been any new chats within the last 10 seconds and return true if so. 
        //Otherwise return false
        router.get('/areNewChats', function (req, res) {
            //initialize or get the singelton
            var client = ChatClient.ChatClient.getInstance(req.mongoose);
            var db = req.db;
            var clients = db.get('clients');
            clients.find({}, function (err, history) {
                var currentTime = new Date();
                var lastChat = new Date(history[0].lastMessageDate);
                var timeDiff = Math.abs(currentTime.getTime() - lastChat.getTime());
                //console.log(timeDiff + " " + ChatAlternate.CHAT_TIME_OUT);
                if (timeDiff < ChatAlternate.CHAT_TIME_OUT) {
                    res.json(true);
                }
                else {
                    res.json(false);
                }
            });
        });
        module.exports = router;
    };
    ChatAlternate.CHAT_TIME_OUT = 10000;
    return ChatAlternate;
})();
var chatAlternate = new ChatAlternate();
chatAlternate.startChat();
