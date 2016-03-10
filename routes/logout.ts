///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 


var express = require('express');
var router = express.Router();

router.get('/', function(req, res, db) {
    res.clearCookie('_id');
    res.clearCookie('accountType');
    res.clearCookie('userName');
    res.redirect('/');
	
});

module.exports = router;
