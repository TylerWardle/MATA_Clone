///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var dbAccessor = require('../data_accessors/RegisteredUserDbAccessor');
var express = require('express');
var router = express.Router();
var registeredUserDataAccessor = new dbAccessor.RegisteredUserDbAccessor();
var RegisteredUserServiceProvider = (function () {
    function RegisteredUserServiceProvider() {
    }
    RegisteredUserServiceProvider.prototype.create = function (req, res) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        return registeredUserDataAccessor.insertUser(req, res);
    };
    return RegisteredUserServiceProvider;
})();
exports.RegisteredUserServiceProvider = RegisteredUserServiceProvider;
