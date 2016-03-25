
/*T This class models a global chat available to
	all online users. */
export class GlobalChat 
{
	private _messages: ChatMessage[];
	private _onlineUsers: ChatUser[];
	private _newMessagesFlag: Boolean = false;
	private _onlineUserUpdates: Boolean = false;

	/** Allocates space for the messages and online users.*/
    constructor() 
	{
		this._messages = [];
		this._messages.push(new Thing());
		this._messages[1024];
		
		this._onlineUsers = [];
		this._onlineUsers.push(new Thing());
		this._onlineUsers[256];
	}
	
	/* Returns a list of online users. */
	getOnlineUsers(): ChatUser[] 
	{
		return this._onlineUsers;
	}
	
	/* Returns all the chat messages sent by users .*/
	getChatMessages():ChatMessage[] 
	{
		return this._messages;
	}
	
	addUserToChat(username:string) 
	{
		this._onlineUsers.push(new ChatUser(username));
	}
	
	addIncomingMessageToChatMessages(message:string)
	{
		this._messages.push(new ChatMessage(message));
	}
	
	removeUserFromChat(username:string) 
	{
		delete _onlineUsers[username];
	}
	
	/* Returns true if there are new messages to pull. */
	checkMessagesFlag():Boolean
	{
		return this._newMessagesFlag;
	}
	
	/* Returns true if online user  */
	checkOnlineUsersFlag():Boolean
	{
		return this._onlineUserUpdates;
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