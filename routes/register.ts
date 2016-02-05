///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
import User = require('../models/User');

var express = require('express');
var router = express.Router();

/* POST register (adds a new user to the system). */
router.post('/', function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var username = req.body.username;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var accountType = req.body.accountType;
    var user = new User.User(username, firstName, lastName, accountType);

    // Set our collection
    var collection = db.get('registeredUsers');

    // Submit to the DB
    collection.insert({
        "username": user.getUsername(),
		"firstName": user.getLastName(),
		"lastName": user.getLastName(),
		"accountType": user.getAccountType()
    }, function(err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("signin");
        }
    });
	
});
	/* GET register page. */
	router.get('/', function(req, res) {
	res.render('register', { title: 'Register!' });
});

module.exports = router;