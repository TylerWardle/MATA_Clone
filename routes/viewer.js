///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
"use strict";
var Comic = require('../models/Comic');
var ComicCell = require('../models/ComicCell');
var Service = require('../services/SearchBrowseService');
var ViewerServiceProvider = require('../services/ViewerServiceProvider');
var ViewerSP = new ViewerServiceProvider.ViewerServiceProvider();
var viewer = (function () {
    function viewer() {
    }
    viewer.prototype.startViewer = function () {
        var express = require('express');
        var router = express.Router();
        var ObjectID = require('mongodb').ObjectID;
        /* GET Viewers homepage. */
        router.get('/', function (req, res, db) {
            var db = req.db;
            var viewers = db.get('viewers');
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);
            var s = new Service.SearchBrowseService(req.mongoose);
            //var comicsList = "https://fast-beach-12058.herokuapp.com/webcomic/id/56bac1a83da2ef110089f60e, https://fast-beach-12058.herokuapp.com/webcomic/id/56bac1a83da2ef110089f60f";
            ViewerSP.getViewer(req, res);
        });
        module.exports = router;
    };
    return viewer;
}());
var Viewer = new viewer();
Viewer.startViewer();
