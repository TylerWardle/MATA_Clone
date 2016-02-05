///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

export class User 
{
	private firstName: string;
	private lastName: string;
	private username: string;
	private accountType: string;
	private userId: string;
	

    constructor(username: string, firstName: string, lastName: 
		string, accountType: string) 
	{
        this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.accountType = accountType;
    }

    getUsername(): string 
	{
        return this.username;
    }
	

    getFirstName(): string 
	{
        return this.firstName;
    }

    getLastName(): string 
	{
        return this.lastName;
    }	
	
	getAccountType(): string 
	{
        return this.accountType;
    }
	
	getUserId(): string
	{
		return this.userId;
	}
}

