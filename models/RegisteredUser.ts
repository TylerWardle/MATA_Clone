///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

// This class represents a registered user in the system. 
// This class is used to verify a user before granting them
// access to the system.
export class RegisteredUser 
{
	private firstName: string;
	private lastName: string;
	private username: string;
    private password: string;
	private accountType: string;
	private guid: string;
	private secretQuestion: string;
	private secretAnswer: string;

    constructor(username: string, password: string, firstName: string,
		lastName: string, accountType: string /*,Question: string, sAnswer:string*/ ) 
	{
        this.username = username;
        this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.accountType = accountType;
		this.guid = Guid.newGuid();
		//this.secretQuestion = sQuestion;
		//this.secretAnswer = secretAnswer;
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
	
	getGuid(): string
	{
		return this.guid;
	}
	
	getSecretQuestion(): string
	{
		 return this.secretQuestion;
	}
	
	getSecretAnswer(): string
	{
		 return this.secretAnswer;
	}
	
}

class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
}
