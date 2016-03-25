///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import SubscriptionService = require('../services/SubscriptionServiceProvider');

class Subscription {

    constructor() { }

    startSubscription() {
		var express = require('express');
		var router = express.Router();
		
		var subscriptionServiceProvider = new SubscriptionService.SubscriptionServiceProvider();

		/* POST Subscribe to a contributor. */
		router.post('/', function (req, res) {
			var contributorId = req.params.id;
			subscriptionServiceProvider.subscribeToUser(req, res, contributorId);
		});



		/* Delete unsubscribe to a contributor. */
		router.delete('/', function (req, res) {

		});
		module.exports = router;


		}
	}
	
var subscription = new Subscription();
subscription.startSubscription();