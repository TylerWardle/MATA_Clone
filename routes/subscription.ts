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


		/* Delete Unsubscribe to a contributor. */
		router.delete('/', function (req, res) {
			var contributorId = req.params.id;
			subscriptionServiceProvider.unsubscribeFromUser(req, res, contributorId);
		});
		
		/* Get list of subscripts for a user*/
		router.get('/', function (req, res){ 
			var contributorId = req.params.id;
			var subscriptions = subscriptionServiceProvider.getSubscriptionListForUser(req, res, contributorId);			
			
			var subscriptionList =  subscriptions.split(',');
			
			// render if here.
			
		});
		
		module.exports = router;
	}
}
	
var subscription = new Subscription();
subscription.startSubscription();