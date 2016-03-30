///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var GlobalChat = require('../models/GlobalChat');
/* This router is responsible for updating the global chat.*/
var Chat = (function () {
    function Chat() {
    }
    Chat.prototype.startChat = function () {
        var express = require('express');
        var router = express.Router();
        var chatService = GlobalChat.GlobalChat.getInstance();
        /* POST a new chat message */
        router.post('/', function (req, res) {
            var username = req.cookies.username;
            var message = req.body.chatMessage;
            res.json(message);
            chatService.addIncomingMessageToChatMessages(message, username);
        });
        /* GET chat history */
        router.get('/history', function (req, res) {
            var history = chatService.getChatMessages();
            res.json(history);
        });
        /* GET chat history */
        router.get('/onlineusers', function (req, res) {
            var onlineUsers = chatService.getOnlineUsers();
            res.json(onlineUsers);
        });
        /* GET flag check for new chats */
        router.get('/status', function (req, res) {
            // returns the current number of message in the chat
            res.json(true);
        });
        /* GET the last n  entries?*/
        router.get('/status:n', function (req, res) {
            // returns the current number of message in the chat .
            var lastSeenCount = req.params.n;
            var currentNumberOfMessage = chatService.getCurrentMessageCount();
            if (lastSeenCount < currentNumberOfMessage) {
                var chatHistory = chatService.getChatMessages();
                res.json(chatHistory);
            }
        });
        module.exports = router;
    };
    return Chat;
})();
var chat = new Chat();
chat.startChat();
