///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import GlobalChat = require('../models/GlobalChat');

class Logout {

    constructor() { }

    startLogout() {

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
		
		}
	}
	
var logout = new Logout();
logout.startLogout();

