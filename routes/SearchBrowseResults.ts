///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import Comic = require('../models/Comic');
import ComicCell = require('../models/ComicCell');
import Service = require('../services/SearchBrowseService');

class SearchBrowseResults {
    constructor() {}

    startSearchBrowseResults() {

    var express = require('express');
    var router = express.Router();
    var ObjectID = require('mongodb').ObjectID;
    
    
    /* */
    router.get('/', function(req, res) {
        /* I don't know why this line seems to be importtant even though we don't use c*/
        var c = new Comic.Comic(req.mongoose);
        var s = new Service.SearchBrowseService(req.mongoose);
        s.getComics(req.url,(comics:any): void =>{
                res.render('searchResults', {"Comics": comics,"header": req.headers['host'] + "/webcomic/"});   
            });
        
        });
    module.exports = router;    
    }       
} 
var searchBrowseResults = new SearchBrowseResults();
searchBrowseResults.startSearchBrowseResults();