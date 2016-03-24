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
        return true;
    };
    HistoryServiceProvider.prototype.checkForDuplicateEntry = function (req, res) {
        return false;
    };
    HistoryServiceProvider.prototype.getViewingHistory = function (req, res) {
        return false;
    };
    return HistoryServiceProvider;
})();
exports.HistoryServiceProvider = HistoryServiceProvider;
