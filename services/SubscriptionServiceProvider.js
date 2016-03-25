///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var SubscriptionServiceProvider = (function () {
    function SubscriptionServiceProvider() {
    }
    /*  */
    SubscriptionServiceProvider.prototype.subscribeToUser = function (req, res, contributorId) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        registeredUsers.findOne({ username: req.cookies._username }, function (err, user) {
            registeredUsers.update({ username: req.cookies._username }, {
                $set: {
                    subscriptions: user.subscriptions + "," + contributorId
                }
            });
        });
        return true;
    };
    /* Returns the history of viewed webcomic  for a user. */
    SubscriptionServiceProvider.prototype.unsubscribeFromUser = function (req, res, contributorId) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        registeredUsers.findOne({ username: req.cookies._username }, function (err, user) {
            // find the username, and rmeove it from the string, then update the string.
            registeredUsers.update({ username: req.cookies._username }, {
                $set: {
                    subscriptions: user.subscriptions + "," + contributorId
                }
            });
        });
        return true;
    };
    return SubscriptionServiceProvider;
})();
exports.SubscriptionServiceProvider = SubscriptionServiceProvider;
