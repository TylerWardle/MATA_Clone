///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>


var express = require('express');
var router = express.Router();


export class SubscriptionServiceProvider 
{
	constructor() { }
	
	/*  */
	subscribeToUser(req:any, res:any, _username:any): Boolean
	{
		var db = req.db;
		var registeredUsers = db.get('registeredUsers');
		
		registeredUsers.findOne({username:_username}, function(err, user) {
			
			registeredUsers.update({username:_username},
			   {
					$set:
					{
						subscriptions: user.subscriptions + "," + _username
					}
			   });
		});
		
		return true;
	}
	
	/*  Returns the list of subscription for a given user. */
	getSubscriptionListForUser(req:any, res:any, _username:any): any
	{
		var db = req.db;
		var registeredUsers = db.get('registeredUsers');
		
		return registeredUsers.findOne({username:_username});
	}
	
	
	
	/* Unsubcribe from a  user. */
	unsubscribeFromUser(req:any, res:any, _username:any): any
	{
		var db = req.db;
		var registeredUsers = db.get('registeredUsers');
		
		// TO DO find the username, and rmeove it from the string, then update the string.
		registeredUsers.findOne({username:_username}, function(err, user) {
			
			registeredUsers.update({username:_username},
			   {
					$set:
					{
						subscriptions: user.subscriptions + "," + _username
					}
			   });
		});
		
		return true;
	}
} 