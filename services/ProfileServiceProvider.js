///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var ProfileServiceProvider = (function () {
    function ProfileServiceProvider() {
    }
    ProfileServiceProvider.prototype.create = function (req, res) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        return true;
    };
    ProfileServiceProvider.prototype.read = function (req, res) {
        return false;
    };
    ProfileServiceProvider.prototype.update = function (req, res) {
        return false;
    };
    ProfileServiceProvider.prototype.remove = function (req, res) {
        return false;
    };
    return ProfileServiceProvider;
})();
exports.ProfileServiceProvider = ProfileServiceProvider;
