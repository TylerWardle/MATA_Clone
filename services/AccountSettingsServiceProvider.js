///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
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
        return true;
    };
    return AccountSettingsServiceProvider;
})();
exports.AccountSettingsServiceProvider = AccountSettingsServiceProvider;
