///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
"use strict";
var SubscriptionService = require('../services/SubscriptionServiceProvider');
var Subscription = (function () {
    function Subscription() {
    }
    Subscription.prototype.startSubscription = function () {
        var express = require('express');
        var router = express.Router();
        var subscriptionServiceProvider = new SubscriptionService.SubscriptionServiceProvider();
        /* POST Subscribe to a contributor. */
        router.post('/:id', function (req, res) {
            var contributorId = req.params.id;
            subscriptionServiceProvider.subscribeToUser(req, res, contributorId);
            res.redirect('/profile/user/' + contributorId);
        });
        /* Delete Unsubscribe to a contributor. */
        router.post('/delete/:id', function (req, res) {
            var contributorId = req.params.id;
            subscriptionServiceProvider.unsubscribeFromUser(req, res, contributorId);
            res.redirect('/profile/user/' + contributorId);
        });
        /* Get list of subscripts for a user*/
        router.get('/', function (req, res) {
            var contributorId = req.params.id;
            var subscriptions = subscriptionServiceProvider.getSubscriptionListForUser(req, res, contributorId);
            var subscriptionList = subscriptions.split(',');
            // render if here.
        });
        module.exports = router;
    };
    return Subscription;
}());
var subscription = new Subscription();
subscription.startSubscription();
