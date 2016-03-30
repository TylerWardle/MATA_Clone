///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var LogoutServiceProvider = (function () {
    function LogoutServiceProvider() {
    }
    LogoutServiceProvider.prototype.getLogout = function (req, res) {
        var db = req.db;
        return true;
    };
    return LogoutServiceProvider;
})();
exports.LogoutServiceProvider = LogoutServiceProvider;
