///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var Comic = require('../models/Comic');
var ComicCell = require('../models/ComicCell');
var Service = require('../services/SearchBrowseService');
var SearchBrowseResults = (function () {
    function SearchBrowseResults() {
    }
    SearchBrowseResults.prototype.startSearchBrowseResults = function () {
        var express = require('express');
        var router = express.Router();
        var ObjectID = require('mongodb').ObjectID;
        /* */
        router.get('/', function (req, res) {
            /* I don't know why this line seems to be importtant even though we don't use c or cc*/
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);
            var s = new Service.SearchBrowseService(req.mongoose);
            s.getComics(req, function (comics) {
                res.render('searchResults', { "Comics": comics, "header": req.headers['host'] + "/webcomic/" });
            });
        });
        module.exports = router;
    };
    return SearchBrowseResults;
})();
var searchBrowseResults = new SearchBrowseResults();
searchBrowseResults.startSearchBrowseResults();
