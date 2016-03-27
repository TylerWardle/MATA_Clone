///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
"use strict";
var RegisteredUserDbAccessor = (function () {
    function RegisteredUserDbAccessor() {
    }
    RegisteredUserDbAccessor.prototype.insertUser = function (req, res) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        registeredUsers.findOne({ username: req.body.username }, function (err, item) {
            if (item) {
                console.log("reached item found case");
                return false;
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
                            var viewers = req.db.get('viewers');
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
    RegisteredUserDbAccessor.prototype.insertNewRegisteredUser = function (req, res, accountType) {
        return false;
    };
    RegisteredUserDbAccessor.prototype.update = function (req, res) {
        return false;
    };
    RegisteredUserDbAccessor.prototype.remove = function (req, res) {
        return false;
    };
    return RegisteredUserDbAccessor;
}());
exports.RegisteredUserDbAccessor = RegisteredUserDbAccessor;
