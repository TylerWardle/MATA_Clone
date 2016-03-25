///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>


var express = require('express');
var router = express.Router();


export class SubscriptionServiceProvider 
{
	constructor() { }
	
	/*  */
	subscribeToUser(req:any, res:any, contributorId:any): Boolean
	{
		var db = req.db;
		var registeredUsers = db.get('registeredUsers');
		
		registeredUsers.findOne({username:req.cookies._username}, function(err, user) {
			
			registeredUsers.update({username:req.cookies._username},
			   {
					$set:
					{
						subscriptions: user.subscriptions + "," + contributorId
					}
			   });
		});
		
		return true;
	}
	
	/* Returns the history of viewed webcomic  for a user. */
	unsubscribeFromUser(req:any, res:any, contributorId:any): any
	{
		var db = req.db;
		var registeredUsers = db.get('registeredUsers');
		
		registeredUsers.findOne({username:req.cookies._username}, function(err, user) {
			
			// find the username, and rmeove it from the string, then update the string.
			registeredUsers.update({username:req.cookies._username},
			   {
					$set:
					{
						subscriptions: user.subscriptions + "," + contributorId
					}
			   });
		});
		
		return true;
	}
} 