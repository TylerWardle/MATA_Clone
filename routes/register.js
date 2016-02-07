var express = require('express');
var router = express.Router();
/* POST register (adds a new user to the system). */
router.post('/', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    req.headers;
    registeredUsers.findOne({ username: req.body.username }, function (err, item) {
        if (item) {
            res.send("username " + item.username + "is already taken!");
        }
        else {
            var username = req.body.username;
            var firstName = req.body.firstName;
            var lastName = req.body.lastName;
            var accountType = req.body.accountType;
            var password = req.body.password;
            console.log("request headers " + req.headers);
            //var registeredUser = new RegisteredUser.RegisteredUser(username, password, firstName, lastName, accountType);
            registeredUsers.insert({
                "username": req.body.username,
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "accountType": req.body.accountType,
                "password": req.body.password
            }, function (err, doc) {
                if (err) {
                    res.send("There was a problem adding the information to the database.");
                }
                else {
                    if (accountType === "viewer") {
                        var viewers = db.get('viewers');
                        //var newViewer = new Viewer(username, password, firstName, lastName, accountType);
                        viewers.insert({
                            "username": req.body.username,
                            "firstName": req.body.firstName,
                            "lastName": req.body.lastName
                        }, function (err, doc) {
                            if (err) {
                                res.send("There was a problem adding the information to the database.");
                            }
                        });
                    }
                    else {
                        var contributors = db.get('contributors');
                        //var newContributor = new Contributor(username, password, firstName, lastName, accountType);
                        contributors.insert({
                            "username": req.body.username,
                            "firstName": req.body.firstName,
                            "lastName": req.body.lastName
                        }, function (err, doc) {
                            if (err) {
                                res.send("There was a problem adding the information to the database.");
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