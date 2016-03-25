///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>
var Chat = (function () {
    function Chat() {
    }
    Chat.prototype.startChat = function () {
        var express = require('express');
        var router = express.Router();
        var ObjectID = require('mongodb').ObjectID;
        /* POST a new chat message */
        router.post('/', function (req, res) {
        });
        /* GET chat history */
        router.get('/', function (req, res) {
        });
        /* GET flag check for new chats */
        router.get('/status', function (req, res) {
        });
        module.exports = router;
    };
    return Chat;
})();
var chat = new Chat();
chat.startChat();
