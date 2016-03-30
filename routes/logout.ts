///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import GlobalChat = require('../models/GlobalChat');
import LogoutServiceProvider = require('../services/LogoutServiceProvider');

var LogoutSP = new LogoutServiceProvider.LogoutServiceProvider();
var express = require('express');
var router = express.Router();

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
			
			LogoutSP.getLogout(req,res);
		});
		module.exports = router;

		}
	}
	
var logout = new Logout();
logout.startLogout();

