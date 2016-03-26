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
		
		return true;
	}
	
	read(req:any, res:any): Boolean
	{
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        var comics = db.get("comics");
        var userName = req.params.userName;
        var isOwner = false;
        if(userName === req.cookies.userName)
            isOwner = true;
        
        registeredUsers.findOne({username:userName}, function(err, user) {
            //comics.find({authorUsername:userName}, function(err,comics) {
            comics.find({$and:[{authorUsername:userName},{'toPublish':true}]}, function(err,comics) {    
                res.render('profile', { "user": user, "comics": comics, "isOwner": isOwner, "header": req.headers['host']});
                
                
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