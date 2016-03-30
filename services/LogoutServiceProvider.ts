///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>


var express = require('express');
var router = express.Router();

export class LogoutServiceProvider {

	constructor() { }

	getLogout(req: any, res: any): Boolean {

			res.clearCookie('_id');
			res.clearCookie('accountType');
			res.clearCookie('userName');
			res.redirect('/');
			
		return true;
	}

} 