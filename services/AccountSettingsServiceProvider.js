///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var AccountSettingsServiceProvider = (function () {
    function AccountSettingsServiceProvider() {
    }
    AccountSettingsServiceProvider.prototype.create = function (req, res) {
        var db = req.db;
        return true;
    };
    AccountSettingsServiceProvider.prototype.read = function (req, res) {
        return false;
    };
    AccountSettingsServiceProvider.prototype.update = function (req, res) {
        return false;
    };
    AccountSettingsServiceProvider.prototype.remove = function (req, res) {
        return false;
    };
    return AccountSettingsServiceProvider;
})();
exports.AccountSettingsServiceProvider = AccountSettingsServiceProvider;
