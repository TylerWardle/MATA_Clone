///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

import Viewer = require('../models/Viewer');
import Contributor = require('../models/Contributor');
import RegisteredUser = require('../models/RegisteredUser');
import dbAccessor = require('../data_accessors/RegisteredUserDbAccessor');


var express = require('express');
var router = express.Router();

var registeredUserDataAccessor = new dbAccessor.RegisteredUserDbAccessor();

export class RegisteredUserServiceProvider 
{
	constructor() { }
	
	create(req:any, res:any): Boolean
	{
	    var db = req.db;
		var registeredUsers = db.get('registeredUsers');
		
		return registeredUserDataAccessor.insertUser(req, res);		
	}
} 