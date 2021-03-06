///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var SubscriptionServiceProvider = (function () {
    function SubscriptionServiceProvider() {
    }
    /*  */
    SubscriptionServiceProvider.prototype.subscribeToUser = function (req, res, _username) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        //registeredUsers.findOne({username:_username}, function(err, user) {
        //console.log(_username);
        //console.log(req.cookies.userName);
        //registeredUsers.update({username:_username},
        registeredUsers.update({ username: req.cookies.userName }, { $push: { subscriptions: _username } });
        //});
        return true;
    };
    /*  Returns the list of subscription for a given user. */
    SubscriptionServiceProvider.prototype.getSubscriptionListForUser = function (req, res, _username) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        return registeredUsers.findOne({ username: _username });
    };
    /* Unsubcribe from a  user. */
    SubscriptionServiceProvider.prototype.unsubscribeFromUser = function (req, res, _username) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        // TO DO find the username, and rmeove it from the string, then update the string.
        registeredUsers.update({ username: req.cookies.userName }, { $pull: { subscriptions: _username } });
        //		registeredUsers.findOne({username:_username}, function(err, user) {
        //			
        //			registeredUsers.update({username:_username},
        //			   {
        //					$set:
        //					{
        //						subscriptions: user.subscriptions - _username
        //					}
        //			   });
        //		});
        return true;
    };
    return SubscriptionServiceProvider;
})();
exports.SubscriptionServiceProvider = SubscriptionServiceProvider;
