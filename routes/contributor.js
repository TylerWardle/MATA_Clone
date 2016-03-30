///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var Comic = require('../models/Comic');
var ComicCell = require('../models/ComicCell');
var Service = require('../services/SearchBrowseService');
var contributor = (function () {
    function contributor() {
    }
    ;
    contributor.prototype.startContributor = function () {
        var express = require('express');
        var router = express.Router();
        var ObjectID = require('mongodb').ObjectID;
        /* GET Contributors homepage. */
        router.get('/', function (req, res) {
            var db = req.db;
            var contributors = db.get('contributors');
            var registeredUsers = db.get('registeredUsers');
            var c = new Comic.Comic(req.mongoose);
            var cc = new ComicCell.ComicCell(req.mongoose);
            var s = new Service.SearchBrowseService(req.mongoose);
            contributors.findOne({ guid: ObjectID(req.cookies._id) }, function (error, contributor) {
                console.log(contributor);
                if (contributor.favoritesC != null) {
                    var favorites = contributor.favoritesC;
                    s.getComics(req, function (comics) {
                        console.log("length of an empty array: " + new Array());
                        //console.log(comics);
                        res.render('contributor', { "contributor": contributor, "favorites": favorites, "header": req.headers['host'] + "/webcomic/", "comics": comics });
                    });
                }
                else {
                    s.getComics(req, function (comics) {
                        console.log("length of an empty array: " + new Array());
                        //console.log(comics);
                        res.render('contributor', { "contributor": contributor, "header": req.headers['host'] + "/webcomic/", "comics": comics });
                    });
                }
            });
        });
        module.exports = router;
    };
    return contributor;
})();
var Contributor = new contributor();
Contributor.startContributor();
