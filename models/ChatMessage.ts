///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

/* This class models a chat message. These message object are used to 
	create a global chat where the messages will be shared among all online
	registered users. */
export class ChatMessage 
{
	private message: string;
	private sentTime: string;
	private username: string;

    constructor(message: string, _username:string) 
	{
        this.username = _username;
		var date = new Date();
		var time = date.toUTCString(); 
		this.sentTime = time;
		this.message = _message;
    }

    getUsername(): string 
	{
        return this.username;
    }

    getMessage(): string 
	{
        return this.message;
    }

    getMessageSentTime(): string 
	{
        return this.sentTime;
    }
}