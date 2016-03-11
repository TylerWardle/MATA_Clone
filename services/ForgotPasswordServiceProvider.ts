///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

import Viewer = require('../models/Viewer');
import Contributor = require('../models/Contributor');
import providers = require('../interfaces/IServiceProvider');

var express = require('express');
var router = express.Router();

export class ForgotPasswordServiceProvider implements providers.IServiceProvider 
{
	constructor() { }
	
	create(req:any, res:any): Boolean
	{
	    var db = req.db;

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