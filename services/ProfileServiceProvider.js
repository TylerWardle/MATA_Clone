///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var ProfileServiceProvider = (function () {
    function ProfileServiceProvider() {
    }
    ProfileServiceProvider.prototype.create = function (req, res) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        var contributors = db.get("contributors");
        var comicID = req.params.id;
        return true;
    };
    ProfileServiceProvider.prototype.read = function (req, res) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        var comics = db.get("comics");
        var userName = req.params.userName;
        var isOwner = false;
        if (userName === req.cookies.userName)
            isOwner = true;
        registeredUsers.findOne({ username: userName }, function (err, user) {
            //see if the field fave in comics contains the user's username (to render favorited comics on profile page)
            comics.find({ fave: { $in: [userName] } }, function (err, comicsfav) {
                //see if a comic is published and is owned by the user to show published comics on profile page)
                comics.find({ $and: [{ authorUsername: userName }, { 'toPublish': true }] }, function (err, comics) {
                    res.render('profile', { "user": user, "comics": comics, "favorites": comicsfav, "isOwner": isOwner, "header": req.headers['host'] });
                });
            });
        });
        return false;
    };
    ProfileServiceProvider.prototype.update = function (req, res) {
        return false;
    };
    ProfileServiceProvider.prototype.remove = function (req, res) {
        return false;
    };
    return ProfileServiceProvider;
})();
exports.ProfileServiceProvider = ProfileServiceProvider;
