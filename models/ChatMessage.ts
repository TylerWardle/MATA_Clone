///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

export class ChatMessage 
{
	private message: string;
	private date: Data;
	private username: string;

    constructor(message: string, date:Date, _username:string) 
	{
        this.username = _username;
		this.date = _date;
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

    getTime(): Date 
	{
        return this.date;
    }
}