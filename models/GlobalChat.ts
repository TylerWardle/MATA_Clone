
import ChatMessage = require('./ChatMessage');
import ChatUser = require('./ChatUser');

/*T This class models a global chat available to
	all online users. */
export class GlobalChat 
{
	// This instance will be used but chat, signin, and logout routers.
	private static _instance:GlobalChat = new GlobalChat();

	private _messages: ChatMessage.ChatMessage[];
	private _onlineUsers: ChatUser.ChatUser[];
	private _currentMessageCount: number = 0;
	private _onlineUserCount: number = 0;

	/** Allocates space for the messages and online users.*/
    constructor() 
	{
		this._messages = [];
		this._messages[1024];
		
		this._onlineUsers = [];
		this._onlineUsers[256];
		
		GlobalChat._instance = this;
	}
	
	/* Handle to the globalchat instance. */
	public static getInstance():GlobalChat
	{
		return GlobalChat._instance;
	}
	
	/* Returns a list of online users. */
	getOnlineUsersList(): ChatUser.ChatUser[] 
	{
		return this._onlineUsers;
	}
	
	/* Returns all the chat messages sent by users .*/
	getChatMessages():ChatMessage.ChatMessage[] 
	{
		return this._messages;
	}
	
	/* Adds a user to the online chat list.
		This happens when the user logs in. */
	addUserToChat(username:string) 
	{
		var newUser = new ChatUser.ChatUser(username);
		this._onlineUsers.push(newUser);
		this._onlineUserCount++;
	}
	
	/* Adds an incoming message to the list of messages.  */
	addIncomingMessageToChatMessages(message:string, username:string)
	{
		var newMessage = new ChatMessage.ChatMessage(message,username);
		this._messages.push(newMessage);
		this._currentMessageCount++;
	}
	
	/* Removes a user from the list of online user.
		This happens when the user logs out. */
	removeUserFromChat(username:string) 
	{
		delete this._onlineUsers[username];
		this._onlineUserCount--;
	}
	
	/* Returns true if there are new messages to pull. */
	getCurrentMessageCount():number
	{
		return this._currentMessageCount;
	}
	
	/* Returns true if online user  */
	getOnlineUsers():number
	{
		return this._onlineUserCount;
	}
}

// Trying to figure out how to use a dynamic list.......
class List<T> {
    private items: Array<T>;

    constructor() {
        this.items = [];
    }

    size(): number {
        return this.items.length;
    }

    add(value: T): void {
        this.items.push(value);
    }

    get(index: number): T {
        return this.items[index];
    }
}

class Map<T> {
    private items: { [key: string]: T };

    constructor() {
        this.items = {};
    }

    add(key: string, value: T): void {
        this.items[key] = value;
    }

    has(key: string): boolean {
        return key in this.items;
    }

    get(key: string): T {
        return this.items[key];
    }
}