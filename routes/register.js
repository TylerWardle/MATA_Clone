var express = require('express');
var router = express.Router();
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
                "profilePicture": "http://www.openshot.org/images/blank_profile.png",
                "aboutMe": "Nothing has been added to this section yet..",
                "lastLogin": (new Date()).toDateString()
            }, function (err, doc) {
                if (err) {
<<<<<<< HEAD
                    res.send("There was a problem adding the information to the database.1");
=======
                    res.render("error", { message: "There was a problem adding the information to the database.1" });
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
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
<<<<<<< HEAD
                                res.send("There was a problem adding the information to the database.2");
=======
                                res.render("error", { message: "There was a problem adding the information to the database.2" });
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
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
<<<<<<< HEAD
                                res.send("There was a problem adding the information to the database.3");
=======
                                res.render("error", { message: "There was a problem adding the information to the database.3" });
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
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
