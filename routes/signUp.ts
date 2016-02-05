///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var express = require('express');
var router = express.Router();
/* GET register page. */
router.get('/', function(req, res) {
	res.render('register', { title: 'Register' });
});

module.exports = router;