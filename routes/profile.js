///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
//<reference path='../types/DefinitelyTyped/mongodb/mongodb-1.4.9.d.ts'/>
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
/* GET  Profile settings. */
router.get('/', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    // Fetch the document
    registeredUsers.findOne({ _id: req.headers['_id'] }, function (err, user) {
        if (user) {
            if (user.accountType === "viewer") {
                var viewers = db.get('viewers');
                viewers.findOne({ _id: req.headers['_id'] }, function (err, viewers) {
                    if (err) {
                        res.send("ACCESS DENIED");
                    }
                });
            }
            else {
                var contributors = db.get('contributors');
                contributors.findOne({ _id: req.headers['_id'] }, function (err, contributor) {
                    if (err) {
                        res.send("ACCESS DENIED");
                    }
                });
            }
            res.render('profile', { "profile": user });
            res.redirect("profile");
        }
        else {
            res.send("ACCESS DENIED");
        }
    });
});
module.exports = router;
