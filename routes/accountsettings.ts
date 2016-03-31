///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
import AccountSettingsServiceProvider = require('../services/AccountSettingsServiceProvider');

var AccountSettingsSP = new AccountSettingsServiceProvider.AccountSettingsServiceProvider();

var express = require('express');
var router = express.Router();

class AccountSettings {

    constructor() { }

    startAccountSettings() {
		var express = require('express');
		var router = express.Router();
		var ObjectID = require('mongodb').ObjectID;
        

		/* GET  Account settings. */
        router.get('/', function(req,res){

            AccountSettingsSP.getAccountSettings(req,res);

        });

		
		/* POST Account setttings */
		router.post('/', function (req, res) {
			AccountSettingsSP.changeAccountSettings(req, res);
		});

		module.exports = router;
				}
	}
	
var accountSettings = new AccountSettings();
accountSettings.startAccountSettings();


