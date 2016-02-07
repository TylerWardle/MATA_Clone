///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
/* GET  homepage. */
router.get('/', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    // Fetch the document
    registeredUsers.findOne({ username: req.body.username }, function (err, item) {
        if (item) {
            if (item.password === req.body.password) {
                res.render('homepage', { "accountsettings": item });
            }
            else {
                res.send("Username and password do not match.");
            }
        }
        else {
            res.send("User does not exist");
        }
    });
});
module.exports = router;
