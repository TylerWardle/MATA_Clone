///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>


var express = require('express');
var router = express.Router();

export class AccountSettingsServiceProvider
{
	constructor() { }
	
	changeAccountSettings(req:any, res:any): Boolean
	{
		var db = req.db;
		var registeredUsers = db.get('registeredUsers');
		return true;
	}

	getAccountSettings(req: any, res: any): Boolean
	{
		var db = req.db;
		var registeredUsers = db.get('registeredUsers');
		
		return true;
	}
} 