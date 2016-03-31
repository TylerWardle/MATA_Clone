///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var HistoryServiceProvider = (function () {
    function HistoryServiceProvider() {
    }
    /* Add a webcomic link to the list of links. */
    HistoryServiceProvider.prototype.addWebComicLinkToList = function (req, res, webcomicId) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        var ObjectId = require('mongodb').ObjectID;
        registeredUsers.update({ username: req.cookies.userName }, { $push: { webComicViewingHistory: ObjectId(webcomicId) } });
        //		registeredUsers.findOne({username:req.cookies._username}, function(err, user) {
        //			// check for duplicate and update.
        //			registeredUsers.update({username:req.cookies._username},
        //			   {
        //					$set:
        //					{
        //						webComicViewingHistory: user.webComicViewingHistory + "," + webcomicId
        //					}
        //			   });
        //		});
        return true;
    };
    /* Returns the history of viewed webcomic  for a user. */
    HistoryServiceProvider.prototype.getViewingHistory = function (req, res) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        var comics = db.get('comics');
        registeredUsers.findOne({ username: req.cookies.userName }, function (err, user) {
            if (user) {
                comics.find({ _id: { $in: user.webComicViewingHistory } }, function (err, comicsViewed) {
                    //console.log(comicsViewed);
                    return comicsViewed;
                });
            }
        });
    };
    return HistoryServiceProvider;
})();
exports.HistoryServiceProvider = HistoryServiceProvider;
