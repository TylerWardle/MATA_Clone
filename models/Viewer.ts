///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
import RegisteredUser = require('../models/RegisteredUser');

export class Viewer extends RegisteredUser 
{
	private firstName: string;
	private lastName: string;
	private username: string;
    private password: string;
	private accountType: string;
	private guid: string;

    function(username: string, password: string, firstName: string,
		lastName: string, accountType: string) 
	{
		super(username, password, firstName, lastName, accountType);
    }
}
