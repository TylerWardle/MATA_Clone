///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
"use strict";
var GlobalChat = require('../models/GlobalChat');
var LogoutServiceProvider = require('../services/LogoutServiceProvider');
var LogoutSP = new LogoutServiceProvider.LogoutServiceProvider();
var express = require('express');
var router = express.Router();
var Logout = (function () {
    function Logout() {
    }
    Logout.prototype.startLogout = function () {
        var express = require('express');
        var router = express.Router();
        var globalChat = GlobalChat.GlobalChat.getInstance();
        /* GET Viewers homepage. */
        router.get('/', function (req, res, db) {
            // remove the user from global chat
            globalChat.removeUserFromChat(req.cookies.username);
            LogoutSP.getLogout(req, res);
        });
        module.exports = router;
    };
    return Logout;
}());
var logout = new Logout();
logout.startLogout();
