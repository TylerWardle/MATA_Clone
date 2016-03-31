///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

import Comic = require('../models/Comic');
import ComicCell = require('../models/ComicCell');
import Service = require('../services/SearchBrowseService');
import HistoryServiceProvider = require('../services/HistoryServiceProvider');

var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


export class ContributorServiceProvider {
	constructor() { }

	getContributor(req: any, res: any): Boolean {
	    var db = req.db;
        var contributors = db.get('contributors');
        var registeredUsers = db.get('registeredUsers');
        var comicsDB = db.get('comics');
        var c = new Comic.Comic(req.mongoose);
        var cc = new ComicCell.ComicCell(req.mongoose);
        var s = new Service.SearchBrowseService(req.mongoose);
        var history = new HistoryServiceProvider.HistoryServiceProvider();
            
      	registeredUsers.findOne({_id: ObjectID(req.cookies._id)}, function(error, contributor)
    	{
            s.getComics(req,(comics:any): void =>{
                registeredUsers.find({username: {$in: contributor.subscriptions}}, function(err, users) {
                    comicsDB.find({_id: {$in: contributor.webComicViewingHistory}} , {sort: {_id:-1}}, function(err, comicsViewed) {
         		        res.render('contributor',{  "users": users, 
                                                    "contributor": contributor,
                                                    "header": req.headers['host'] + "/webcomic/",
                                                    "comics": comics,
                                                    "viewedComics": comicsViewed
                                                    });
                    });
                });    	
            });	
        });

		return true;
	}
} 