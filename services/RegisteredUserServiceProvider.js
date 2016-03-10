///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var express = require('express');
var router = express.Router();
var RegisteredUserServiceProvider = (function () {
    function RegisteredUserServiceProvider() {
    }
    RegisteredUserServiceProvider.prototype.create = function (db, req, res) {
        db.findOne({ username: req.body.username }, function (err, item) {
            if (item) {
                res.render("error", { message: "username " + item.username + " is already taken!" });
            }
            else {
                var username = req.body.username;
                var firstName = req.body.firstName;
                var lastName = req.body.lastName;
                var accountType = req.body.accountType;
                var password = req.body.password;
                db.insert({
                    "username": req.body.username,
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "accountType": req.body.accountType,
                    "password": req.body.password,
                    "securityQuestion": req.body.securityQuestion,
                    "securityAnswer": req.body.securityAnswer,
                    "profilePicture": "http://www.openshot.org/images/blank_profile.png",
                    "aboutMe": "Nothing has been added to this section yet..",
                    "lastLogin": (new Date()).toDateString()
                }, function (err, doc) {
                    if (err) {
                        res.render("error", { message: "There was a problem adding the information to the database.1" });
                    }
                    else {
                        if (accountType === "viewer") {
                            var viewers = req.db.get('viewers');
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
                            var contributors = req.db.get('contributors');
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
        return true;
    };
    RegisteredUserServiceProvider.prototype.read = function (db, req, res) {
        return false;
    };
    RegisteredUserServiceProvider.prototype.update = function (db, req, res) {
        return false;
    };
    RegisteredUserServiceProvider.prototype.remove = function (db, req, res) {
        return false;
    };
    return RegisteredUserServiceProvider;
})();
exports.RegisteredUserServiceProvider = RegisteredUserServiceProvider;
