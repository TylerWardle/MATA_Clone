var RSProvider = require('../services/RegisteredUserServiceProvider');
var express = require('express');
var router = express.Router();
var registeredUserServiceProvider = new RSProvider.RegisteredUserServiceProvider();
/* POST register (adds a new user to the system). */
router.post('/', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    registeredUsers.findOne({ username: req.body.username }, function (err, item) {
        if (item) {
            res.render("error", { message: "username " + item.username + " is already taken!" });
        }
        else {
            var username = req.body.username;
            var firstName = req.body.firstName;
            var lastName = req.body.lastName;
            var accountType = req.body.accountType;
            var password = req.body.password;
            registeredUsers.insert({
                "username": req.body.username,
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "accountType": req.body.accountType,
                "password": req.body.password,
                "securityQuestion": req.body.securityQuestion,
                "securityAnswer": req.body.securityAnswer,
                "profilePicture": "www.openshot.org/images/blank_profile.png"
            }, function (err, doc) {
                if (err) {
                    res.render("error", { message: "There was a problem adding the information to the database.1" });
                }
                else {
                    if (accountType === "viewer") {
                        var viewers = db.get('viewers');
                        //var newViewer = new Viewer(username, password, firstName, lastName, accountType);
                        viewers.insert({
                            "username": doc.username,
                            "firstName": doc.firstName,
                            "lastName": doc.lastName,
                            "guid": doc._id
                        }, function (err, doc) {
                            if (err) {
                                res.render("error", { message: "There was a problem adding the information to the database.2" });
                            }
                        });
                    }
                    else {
                        var contributors = db.get('contributors');
                        //var newContributor = new Contributor(username, password, firstName, lastName, accountType);
                        contributors.insert({
                            "username": doc.username,
                            "firstName": doc.firstName,
                            "lastName": doc.lastName,
                            "guid": doc._id
                        }, function (err, doc) {
                            if (err) {
                                res.render("error", { message: "There was a problem adding the information to the database.3" });
                            }
                        });
                    }
                    res.redirect("signin");
                }
            });
        }
    });
});
/* GET register page. */
router.get('/', function (req, res) {
    res.render('register', { title: 'Register!' });
});
module.exports = router;
//master version below not working
//import RegisteredUser = require('../models/RegisteredUser');
//import Viewer = require('../models/Viewer');
//import Contributor = require('../models/Contributor');
//import RSProvider = require('../services/RegisteredUserServiceProvider');
//
//var express = require('express');
//var router = express.Router();
//var registeredUserServiceProvider = new RSProvider.RegisteredUserServiceProvider();
//
///* POST register (adds a new user to the system). */
//router.post('/', function(req, res) {
//    var db = req.db;
//    var registeredUsers = db.get('registeredUsers');
//    
//    if(registeredUserServiceProvider.create(registeredUsers, req,res))
//        res.redirect("signin");
//    
//});
//
///* GET register page. */
//    router.get('/', function(req, res) {
//    res.render('register', { title: 'Register!' });
//});
//
//module.exports = router; 
