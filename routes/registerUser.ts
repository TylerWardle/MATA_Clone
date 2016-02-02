///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
import User = require('../Model/User');

var express = require('express');
var router = express.Router();

/* POST to Add Resitered User Service */
router.post('/', function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var username = req.body.username;
    var password = req.body.password;
    var user = new User.User(username,password);

    // Set our collection
    var collection = db.get('regusercollection');

    // Submit to the DB
    collection.insert({
        "username": user.getName(),
        "password": user.getPassword()
    }, function(err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userList");
        }
    });
});

module.exports = router;