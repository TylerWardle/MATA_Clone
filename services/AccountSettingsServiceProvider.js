///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var AccountSettingsServiceProvider = (function () {
    function AccountSettingsServiceProvider() {
    }
    AccountSettingsServiceProvider.prototype.changeAccountSettings = function (req, res) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        return true;
    };
    AccountSettingsServiceProvider.prototype.getAccountSettings = function (req, res) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        // Fetch the document
        registeredUsers.findOne({ _id: ObjectID(req.cookies._id) }, function (err, user) {
            if (user) {
                res.render('accountsettings', { "accountsettings": user });
            }
            else {
                res.send("ACCESS DENIED");
            }
        });
        return false;
    };
    return AccountSettingsServiceProvider;
})();
exports.AccountSettingsServiceProvider = AccountSettingsServiceProvider;
