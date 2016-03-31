///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

import Viewer = require('../models/Viewer');
import Contributor = require('../models/Contributor');
import RegisteredUser = require('../models/RegisteredUser');

var express = require('express');
var router = express.Router();

export class RegisteredUserServiceProvider 
{
	constructor() { }
	
	create(req:any, res:any): Boolean
	{
		return true;
	}
} 