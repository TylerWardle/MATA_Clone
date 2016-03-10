///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import Comic = require('../models/Comic');
import ComicCell = require('../models/ComicCell');
import Service = require('../services/SearchBrowseService');

class contributor{
    
    constructor(){};
    
    startContributor(){
        var express = require('express');
        var router = express.Router();
        var ObjectID = require('mongodb').ObjectID;

        
        /* GET Contributors homepage. */
        router.get('/', function(req, res) {
        	var db = req.db;
            var contributors = db.get('contributors');
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);
            var s = new Service.SearchBrowseService(req.mongoose);
            
        	contributors.findOne({guid: ObjectID(req.cookies._id)}, function(error, contributor)
        	{
                s.getComics(req,(comics:any): void =>{
                  console.log(comics);
        		  res.render('contributor',{"contributor": contributor,"header": req.headers['host'] + "/webcomic/", "comics": comics});	
                });	
        	});
        });

    module.exports = router;
    }
    
}
var Contributor = new contributor();
Contributor.startContributor();