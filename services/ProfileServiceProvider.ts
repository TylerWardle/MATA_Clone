///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

import Viewer = require('../models/Viewer');
import Contributor = require('../models/Contributor');
import RegisteredUser = require('../models/RegisteredUser');
import providers = require('../interfaces/IServiceProvider');

var express = require('express');
var router = express.Router();

export class ProfileServiceProvider implements providers.IServiceProvider 
{
	constructor() { }
	
	create(req:any, res:any): Boolean
	{
	    var db = req.db;
		var registeredUsers = db.get('registeredUsers');
		var contributors = db.get("contributors");
		var comicID = req.params.id;
		
		return true;
}
	
	read(req:any, res:any): Boolean
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