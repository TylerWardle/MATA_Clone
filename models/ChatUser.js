"use strict";
/* This class models an online user in the global chat
    client. The are created and added to the Global chat object's
    list of online users when a user logs in, and removed when they log out.*/
var ChatUser = (function () {
    function ChatUser(username) {
        this.username = username;
    }
    ChatUser.prototype.getUsername = function () {
        return this.username;
    };
    return ChatUser;
}());
exports.ChatUser = ChatUser;
