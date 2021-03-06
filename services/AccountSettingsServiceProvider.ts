///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>


var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


export class AccountSettingsServiceProvider
{
	constructor() { }
	
	changeAccountSettings(req:any, res:any): Boolean
	{
			var db = req.db;
			var registeredUsers = db.get('registeredUsers');
			// Fetch the document
			registeredUsers.findOne({_id:ObjectID(req.cookies._id)}, function(err, user) {
				if(user)
				{
					registeredUsers.update({_id:ObjectID(req.cookies._id)},{
						
						$set:
								{
							 
									firstName: req.body.firstName,
									lastName: req.body.lastName,
								
									
									}
									}); 
					if (user.accountType === "viewer") {
						var viewers = db.get('viewers');
						viewers.findOne({guid:ObjectID(req.cookies._id)}, function(err, viewer) {
							if (err) {
								res.send("ACCESS DENIED" + err);
							}
							else
							{
								// need to ask client to give format of data being sent up for account settings..
								// are they only sending updated settings? or all.
								viewers.update({guid:ObjectID(req.cookies._id)},{
									username: viewer.username,
									firstName: req.body.firstName,
									lastName: req.body.lastName,
									guid: viewer.guid
								})
							}
						});
						res.redirect("viewer");
					}
					else {
						var contributors = db.get('contributors');
						contributors.findOne({guid:ObjectID(req.cookies._id)}, function(err, contributor) {
							
							if (err) {
								res.send("ACCESS DENIED");
							}
							else
							{
								// need to ask client to give format of data being sent up for account settings..
								// are they only sending updated settings? or all.
								contributors.update({guid:ObjectID(req.cookies._id)},{
									username: contributor.username,
									firstName: req.body.firstName,
									lastName: req.body.lastName,
									guid: contributor.guid
								})
							}
						});
						res.redirect("contributor");
					}	
					//res.render('accountsettings', { "accountsettings": user });
					//res.redirect("accountsettings");
				}
				else
				{
					res.send("ACCESS DENIED");
				}
			}); 
		return true;
	}

	getAccountSettings(req: any, res: any): Boolean
	{
		var db = req.db;
		var registeredUsers = db.get('registeredUsers');
			
			 // Fetch the document
			registeredUsers.findOne({_id:ObjectID(req.cookies._id)}, function(err, user) {
				if(user)
				{			
				   res.render('accountsettings', { "accountsettings": user });
				}else
				{
					res.send("ACCESS DENIED");
				}
			});
		
		return true;
	}
} 