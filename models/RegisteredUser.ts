///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>


// This class represents a registered user in the system. 
// Thsi class is used to verify a user before granting them
// access to the system.
export class RegisteredUser 
{
	private firstName: string;
	private lastName: string;
	private username: string;
    private password: string;
	private accountType: string;
	private userId: string;

    constructor(username: string, password: string) 
	{
        this.username = username;
        this.password = password;
		//generate a new guid to set as the id.
    }

    getUsername(): string 
	{
        return this.username;
    }

    getPassword(): string 
	{
        return this.password;
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
	
	conparePassword(s: string): boolean
	{
		return true;
	}
}