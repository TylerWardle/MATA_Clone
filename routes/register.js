///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var RSProvider = require('../services/RegisteredUserServiceProvider');
var Register = (function () {
    function Register() {
    }
    Register.prototype.startRegister = function () {
        var express = require('express');
        var router = express.Router();
        var registeredUserServiceProvider = new RSProvider.RegisteredUserServiceProvider();
        /* POST register (adds a new user to the system). */
        router.post('/', function (req, res) {
            var db = req.db;
            var registeredUsers = db.get('registeredUsers');
            registeredUsers.findOne({ username: req.body.username }, function (err, item) {
                if (item) {
                    res.render("error", { message: "Username is taken, please choose another username. " });
                }
                else {
                    var username = req.body.username;
                    var firstName = req.body.firstName;
                    var lastName = req.body.lastName;
                    var accountType = req.body.accountType;
                    var password = req.body.password;
                    registeredUsers.insert({
                        "username": req.body.username.toLowerCase(),
                        "firstName": req.body.firstName,
                        "lastName": req.body.lastName,
                        "accountType": req.body.accountType,
                        "password": req.body.password,
                        "securityQuestion": req.body.securityQuestion,
                        "securityAnswer": req.body.securityAnswer,
                        "profilePicture": "http://www.openshot.org/images/blank_profile.png",
                        "aboutMe": "Nothing has been added to this section yet..",
                        "lastLogin": (new Date()).toDateString(),
                        "webComicViewingHistory": "",
                        "subscriptions": ""
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
    };
    return Register;
})();
var register = new Register();
register.startRegister();
