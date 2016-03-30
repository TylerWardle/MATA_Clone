var ChatMessage = require('./ChatMessage');
var ChatUser = require('./ChatUser');
/*T This class models a global chat available to
    all online users. */
var GlobalChat = (function () {
    /** Allocates space for the messages and online users.*/
    function GlobalChat() {
        this._currentMessageCount = 0;
        this._onlineUserCount = 0;
        this._messages = [];
        this._messages[1024];
        this._onlineUsers = [];
        this._onlineUsers[256];
        GlobalChat._instance = this;
    }
    /* Handle to the globalchat instance. */
    GlobalChat.getInstance = function () {
        return GlobalChat._instance;
    };
    /* Returns a list of online users. */
    GlobalChat.prototype.getOnlineUsersList = function () {
        return this._onlineUsers;
    };
    /* Returns all the chat messages sent by users .*/
    GlobalChat.prototype.getChatMessages = function () {
        return this._messages;
    };
    /* Adds a user to the online chat list.
        This happens when the user logs in. */
    GlobalChat.prototype.addUserToChat = function (username) {
        var newUser = new ChatUser.ChatUser(username);
        this._onlineUsers.push(newUser);
        this._onlineUserCount++;
    };
    /* Adds an incoming message to the list of messages.  */
    GlobalChat.prototype.addIncomingMessageToChatMessages = function (message, username) {
        var newMessage = new ChatMessage.ChatMessage(message, username);
        this._messages.push(newMessage);
        this._currentMessageCount++;
    };
    /* Removes a user from the list of online user.
        This happens when the user logs out. */
    GlobalChat.prototype.removeUserFromChat = function (username) {
        delete this._onlineUsers[username];
        this._onlineUserCount--;
    };
    /* Returns true if there are new messages to pull. */
    GlobalChat.prototype.getCurrentMessageCount = function () {
        return this._currentMessageCount;
    };
    /* Returns true if online user  */
    GlobalChat.prototype.getOnlineUsers = function () {
        return this._onlineUserCount;
    };
    // This instance will be used but chat, signin, and logout routers.
    GlobalChat._instance = new GlobalChat();
    return GlobalChat;
})();
exports.GlobalChat = GlobalChat;
// Trying to figure out how to use a dynamic list.......
var List = (function () {
    function List() {
        this.items = [];
    }
    List.prototype.size = function () {
        return this.items.length;
    };
    List.prototype.add = function (value) {
        this.items.push(value);
    };
    List.prototype.get = function (index) {
        return this.items[index];
    };
    return List;
})();
var Map = (function () {
    function Map() {
        this.items = {};
    }
    Map.prototype.add = function (key, value) {
        this.items[key] = value;
    };
    Map.prototype.has = function (key) {
        return key in this.items;
    };
    Map.prototype.get = function (key) {
        return this.items[key];
    };
    return Map;
})();
