///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

import Viewer = require('../models/Viewer');
import Contributor = require('../models/Contributor');
import RegisteredUser = require('../models/RegisteredUser');

export class RegisteredUserDbAccessor  
{
	constructor() { }
	
	retrieveRegisteredUser(req:any, res:any): Boolean
	{
	    var db = req.db;
		var registeredUsers = db.get('registeredUsers');
		
		return true;
	}
	
	insertNewRegisteredUser(req:any, res:any, accountType:string): Boolean
	{
		return false;
	}
	
	update(req:any, res:any): Boolean
	{
		return false;
	}
	
	remove(req:any, res:any): Boolean
	{
		return false;
	}
} 