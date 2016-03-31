///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

import Comic = require('../models/Comic');
import ComicCell = require('../models/ComicCell');
import Service = require('../services/SearchBrowseService');

var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


export class ViewerServiceProvider {
	constructor() { }

	getViewer(req: any, res: any): Boolean {
		var db = req.db;
		var viewers = db.get('viewers');
        var c = new Comic.Comic(req.mongoose);
		var cc = new ComicCell.ComicCell(req.mongoose);
		var s = new Service.SearchBrowseService(req.mongoose);
		//var comicsList = "https://fast-beach-12058.herokuapp.com/webcomic/id/56bac1a83da2ef110089f60e, https://fast-beach-12058.herokuapp.com/webcomic/id/56bac1a83da2ef110089f60f";
				
		viewers.findOne({guid: ObjectID(req.cookies._id)}, function(error, viewer)
		{
			s.getComicsForViewer(req,(comics:any): void =>{
		        res.render('viewer',{"viewer": viewer,"header": req.headers['host'] + "/webcomic/", "comics": comics});    
            }); 

		});

		return true;
	}
} 