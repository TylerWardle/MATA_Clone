///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import HistoryProvider = require('../services/HistoryServiceProvider');

/* This router is responsible for storing and retrieving user history. 
	For now only  all history will be stored. */
class ViewingHistory {

    constructor() { }

    startViewingHistory() {
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
		
			var historyLinks = historyServiceProvider.getViewingHistory(req, res);
			
			// render the links here. waiting for new ui.

		});
		module.exports = router;
	}
}
	
var viewingHistory = new ViewingHistory();
viewingHistory.startViewingHistory();