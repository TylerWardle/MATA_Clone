///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var Logout = (function () {
    function Logout() {
    }
    Logout.prototype.startLogout = function () {
        var express = require('express');
        var router = express.Router();
        /* GET Viewers homepage. */
        router.get('/', function (req, res, db) {
            res.clearCookie('_id');
            res.clearCookie('accountType');
            res.clearCookie('userName');
            res.redirect('/');
        });
        module.exports = router;
    };
    return Logout;
}());
var logout = new Logout();
logout.startLogout();
