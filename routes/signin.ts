///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
import User = require('../models/User');

var express = require('express');
var router = express.Router();



/* GET register page. */
router.get('/', function(req, res) 
{
	res.render('signin', { title: 'Sign In!' });
});

module.exports = router;