///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

import Viewer = require('../models/Viewer');
import Contributor = require('../models/Contributor');

var express = require('express');
var router = express.Router();


export class HistoryServiceProvider 
{
	constructor() { }
	
	/* Add a webcomic link to the list of links. */
	addWebComicLinkToList(req:any, res:any, webcomicId:any): Boolean
	{
		var db = req.db;
		var registeredUsers = db.get('registeredUsers');
		
		return true;
	}
	
	checkForDuplicateEntry(req:any, res:any): Boolean
	{
		return false;
	}
	
	getViewingHistory(req:any, res:any): Boolean
	{
		return false;
	}
} 