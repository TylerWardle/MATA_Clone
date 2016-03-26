///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>
var Subscription = (function () {
    function Subscription() {
    }
    Subscription.prototype.startSubscription = function () {
        var express = require('express');
        var router = express.Router();
        var ObjectID = require('mongodb').ObjectID;
        /* POST Subscribe to a contributor. */
        router.post('/', function (req, res) {
            var db = req.db;
            var registeredUsers = db.get('registeredUsers');
        });
        /* Delete unsubscribe to a contributor. */
        router.delete('/', function (req, res) {
            var db = req.db;
            var registeredUsers = db.get('registeredUsers');
        });
        module.exports = router;
    };
    return Subscription;
})();
var subscription = new Subscription();
subscription.startSubscription();
