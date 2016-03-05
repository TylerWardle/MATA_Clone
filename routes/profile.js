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
    registeredUsers.findOne({ _id: ObjectID(req.cookies._id) }, function (err, user) {
        if (user) {
            res.render('profile', { "user": user });
        }
        else {
            res.send("ACCESS DENIED");
        }
    });
});
/* Gets the edit profile page where the user can update their public profile.*/
router.get('/edit', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    registeredUsers.findOne({ _id: ObjectID(req.cookies._id) }, function (err, user) {
        res.render('editprofile', { "user": user });
    });
});
/* Updates users profile in the DB and redirect user to their newly updated profile*/
router.post('/edit', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    // Fetch the document
    registeredUsers.findOne({ _id: ObjectID(req.cookies._id) }, function (err, user) {
        if (user) {
            res.render('profile', { "user": user });
        }
        else {
            res.send("ACCESS DENIED");
        }
    });
});
/* Update profile page settings. */
router.put('/edit', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    registeredUsers.findOne({ _id: ObjectID(req.cookies._id) }, function (err, user) {
        if (user) {
            registeredUsers.update({ _id: ObjectID(req.cookies._id) }, {
                username: user.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                accountType: user.accountType,
                password: req.body.password
            });
            if (user.accountType === "viewer") {
                var viewers = db.get('viewers');
                viewers.findOne({ guid: ObjectID(req.cookies._id) }, function (err, viewer) {
                    if (err) {
                        res.send("ACCESS DENIED" + err);
                    }
                    else {
                        viewers.update({ guid: ObjectID(req.cookies._id) }, {
                            username: viewer.username,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            guid: viewer.guid
                        });
                    }
                });
                res.redirect("viewer");
            }
            else {
                var contributors = db.get('contributors');
                contributors.findOne({ guid: ObjectID(req.cookies._id) }, function (err, contributor) {
                    if (err) {
                        res.send("ACCESS DENIED");
                    }
                    else {
                        contributors.update({ guid: ObjectID(req.cookies._id) }, {
                            username: contributor.username,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            guid: contributor.guid
                        });
                    }
                });
                res.redirect("contributor");
            }
        }
        else {
            res.send("ACCESS DENIED");
        }
    });
});
module.exports = router;
