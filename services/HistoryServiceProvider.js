///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
"use strict";
var express = require('express');
var router = express.Router();
var HistoryServiceProvider = (function () {
    function HistoryServiceProvider() {
    }
    /* Add a webcomic link to the list of links. */
    HistoryServiceProvider.prototype.addWebComicLinkToList = function (req, res, webcomicId) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        registeredUsers.findOne({ username: req.cookies._username }, function (err, user) {
            // check for duplicate and update.
            registeredUsers.update({ username: req.cookies._username }, {
                $set: {
                    webComicViewingHistory: user.webComicViewingHistory + "," + webcomicId
                }
            });
        });
        return true;
    };
    /* Returns the history of viewed webcomic  for a user. */
    HistoryServiceProvider.prototype.getViewingHistory = function (req, res) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        registeredUsers.findOne({ username: req.cookies._username }, function (err, user) {
            return user.viewingHistory;
        });
        return true;
    };
    return HistoryServiceProvider;
}());
exports.HistoryServiceProvider = HistoryServiceProvider;
