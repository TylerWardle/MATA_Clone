///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var Browse = (function () {
    function Browse() {
    }
    Browse.prototype.startBrowse = function () {
        var express = require('express');
        var router = express.Router();
        router.get('/', function (req, res) {
            res.render('browse');
        });
        module.exports = router;
    };
    return Browse;
})();
var browse = new Browse();
browse.startBrowse();
