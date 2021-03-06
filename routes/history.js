///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var HistoryProvider = require('../services/HistoryServiceProvider');
/* This router is responsible for storing and retrieving user history.
    For now only  all history will be stored. */
var ViewingHistory = (function () {
    function ViewingHistory() {
    }
    ViewingHistory.prototype.startViewingHistory = function () {
        var express = require('express');
        var router = express.Router();
        var historyServiceProvider = new HistoryProvider.HistoryServiceProvider();
        /* POST add a webcomic id to the users history list */
        router.post('/', function (req, res) {
            // get the link in the url for the webcomic
            var userName = req.params.userName;
            historyServiceProvider.addWebComicLinkToList(req, res, userName);
        });
        /* GET the history of webcomics a user has  */
        router.get('/', function (req, res) {
            var contributorId = req.params.id;
            var history = historyServiceProvider.getViewingHistory(req, res);
            var historyList = history.split(',');
            //render it here
        });
        module.exports = router;
    };
    return ViewingHistory;
})();
var viewingHistory = new ViewingHistory();
viewingHistory.startViewingHistory();
