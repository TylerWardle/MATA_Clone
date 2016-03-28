///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var GlobalChat = require('../models/GlobalChat');
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
            res.clearCookie('_id');
            res.clearCookie('accountType');
            res.clearCookie('userName');
            res.redirect('/');
        });
        module.exports = router;
    };
    return Logout;
})();
var logout = new Logout();
logout.startLogout();
