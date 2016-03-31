///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
"use strict";
/* This class models a chat message. These message object are used to
    create a global chat where the messages will be shared among all online
    registered users. */
var ChatMessage = (function () {
    function ChatMessage(_message, _username) {
        this.username = _username;
        var date = new Date();
        var time = date.toUTCString(); // storing server time as the sent time.
        this.sentTime = time;
        this.message = _message;
    }
    ChatMessage.prototype.getUsername = function () {
        return this.username;
    };
    ChatMessage.prototype.getMessage = function () {
        return this.message;
    };
    ChatMessage.prototype.getMessageSentTime = function () {
        return this.sentTime;
    };
    return ChatMessage;
}());
exports.ChatMessage = ChatMessage;
