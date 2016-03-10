///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
import {RegisteredUser} from './RegisteredUser';

class Contributor extends RegisteredUser 
{
    constructor(username: string, password: string, firstName: string,
		lastName: string, accountType: string) 
	{
		super(username, password, firstName, lastName, accountType);
    }
}

