///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

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
		
		registeredUsers.findOne({username:req.cookies._username}, function(err, user) {
			// check for duplicate and update.
			registeredUsers.update({username:req.cookies._username},
			   {
					$set:
					{
						webComicViewingHistory: user.webComicViewingHistory + "," + webcomicId
					}
			   });
		});
		
		return true;
	}
	
	/* Returns the history of viewed webcomic  for a user. */
	getViewingHistory(req:any, res:any): any
	{
		var db = req.db;
		var registeredUsers = db.get('registeredUsers');
		
		registeredUsers.findOne({username:req.cookies._username}, function(err, user) {
			return user.viewingHistory;
		});
		
		return true;
	}
} 