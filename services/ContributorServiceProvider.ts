///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

import Comic = require('../models/Comic');
import ComicCell = require('../models/ComicCell');
import Service = require('../services/SearchBrowseService');

var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


export class ContributorServiceProvider {
	constructor() { }

	getContributor(req: any, res: any): Boolean {
	    var db = req.db;
        var contributors = db.get('contributors');
        var c = new Comic.Comic(req.mongoose);
        var cc = new ComicCell.ComicCell(req.mongoose);
        var s = new Service.SearchBrowseService(req.mongoose);
            
      	contributors.findOne({guid: ObjectID(req.cookies._id)}, function(error, contributor)
    	{
            s.getComics(req,(comics:any): void =>{
            //console.log(comics);
     		    res.render('contributor',{"contributor": contributor,"header": req.headers['host'] + "/webcomic/", "comics": comics});	
            });	
        });

		return true;
	}
} 