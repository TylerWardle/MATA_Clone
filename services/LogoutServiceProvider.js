///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
"use strict";
var express = require('express');
var router = express.Router();
var LogoutServiceProvider = (function () {
    function LogoutServiceProvider() {
    }
    LogoutServiceProvider.prototype.getLogout = function (req, res) {
        res.clearCookie('_id');
        res.clearCookie('accountType');
        res.clearCookie('userName');
        res.redirect('/');
        return true;
    };
    return LogoutServiceProvider;
}());
exports.LogoutServiceProvider = LogoutServiceProvider;
