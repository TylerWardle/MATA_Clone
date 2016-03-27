

/* This class models an online user in the global chat
	client. The are created and added to the Global chat object's
	list of online users when a user logs in, and removed when they log out.*/
export class ChatUser 
{
	private username: string;

    constructor(username: string) 
	{
        this.username = username;
    }

    getUsername(): string 
	{
        return this.username;
    }

}
