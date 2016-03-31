///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var Comic = require('../models/Comic');
var ComicCell = require('../models/ComicCell');
var Service = require('../services/SearchBrowseService');
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var ContributorServiceProvider = (function () {
    function ContributorServiceProvider() {
    }
    ContributorServiceProvider.prototype.getContributor = function (req, res) {
        var db = req.db;
        var contributors = db.get('contributors');
        var registeredUsers = db.get('registeredUsers');
        var c = new Comic.Comic(req.mongoose);
        var cc = new ComicCell.ComicCell(req.mongoose);
        var s = new Service.SearchBrowseService(req.mongoose);
        registeredUsers.findOne({ _id: ObjectID(req.cookies._id) }, function (error, contributor) {
            s.getComics(req, function (comics) {
                //console.log(comics);
                registeredUsers.find({ username: { $in: contributor.subscriptions } }, function (err, users) {
                    //console.log(users);
                    //console.log(contributor.subscriptions);
                    res.render('contributor', { "users": users, "contributor": contributor, "header": req.headers['host'] + "/webcomic/", "comics": comics });
                });
            });
        });
        return true;
    };
    return ContributorServiceProvider;
})();
exports.ContributorServiceProvider = ContributorServiceProvider;
