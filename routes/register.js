var RegisteredUser = require('../models/RegisteredUser');
var express = require('express');
var router = express.Router();
/* POST register (adds a new user to the system). */
router.post('/', function (req, res) {
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var username = req.body.username;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var accountType = req.body.accountType;
    var password = req.body.password;
    var user = new RegisteredUser.RegisteredUser(username, password, firstName, lastName, accountType);
    // Set our collection
    var collection = db.get('registeredUsers');
    // Fetch the document
    collection.findOne({ username: req.body.username }, function (err, item) {
        if (item) {
            res.send("username " + item.username + "is already taken!");
        }
        else {
            // Submit to the DB
            collection.insert({
                "guid": user.getGuid(),
                "username": user.getUsername(),
                "firstName": user.getLastName(),
                "lastName": user.getLastName(),
                "accountType": user.getAccountType(),
                "password": user.getPassword()
            }, function (err, doc) {
                if (err) {
                    // If it failed, return error
                    res.send("There was a problem adding the information to the database.");
                }
                else {
                    // And forward to success page
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
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
module.exports = router;
