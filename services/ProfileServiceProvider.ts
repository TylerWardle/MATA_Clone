///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

import Viewer = require('../models/Viewer');
import Contributor = require('../models/Contributor');
import RegisteredUser = require('../models/RegisteredUser');
import providers = require('../interfaces/IServiceProvider');

var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

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
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        var comics = db.get("comics");
        var userName = req.params.userName;
        var isOwner = false;
        var isSubscribed = false;
        if(userName === req.cookies.userName)
            isOwner = true;
        
        registeredUsers.findOne({username:userName}, function(err, user) {
            
        	//see if the field fave in comics contains the user's username (to render favorited comics on profile page)
            comics.find( { fave: { $in: [userName] } }, function(err,comicsfav){
            	//see if a comic is published and is owned by the user to show published comics on profile page)
				comics.find({ $and: [{ authorUsername: userName }, { 'toPublish': true }] }, function(err, comics) {
                    registeredUsers.findOne({username:req.cookies.userName, subscriptions: userName}, function(err, userTwo) {
                       if(userTwo != null)
                            isSubscribed = true;    
					   res.render('profile', { "user": user, "comics": comics, "favorites": comicsfav, "isOwner": isOwner, "header": req.headers['host'], "isSubscribed": isSubscribed });
                    });
				}); 
            });
        });
        
        
        
        
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