///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import Comic = require('../models/Comic');
import ComicCell = require('../models/ComicCell');
import Service = require('../services/SearchBrowseService');
import ContributorServiceProvider = require('../services/ContributorServiceProvider');

var ContributorSP = new ContributorServiceProvider.ContributorServiceProvider();


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
            
            ContributorSP.getContributor(req, res);

        });

    module. exports = router;
    }
    
}
var Contributor = new contributor();
Contributor.startContributor();