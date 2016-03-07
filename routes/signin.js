var express = require('express');
var router = express.Router();
/* POST to sign into the system. */
router.post('/', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    registeredUsers.findOne({ username: req.body.username }, function (err, user) {
        if (user) {
            //res.set('_id', user._id);
            if (user.password === req.body.password) {
                res.cookie('_id', user._id);
                if (user.accountType === "contributor") {
                    res.redirect("contributor");
                }
                else {
                    res.redirect("viewer");
                }
            }
            else {
<<<<<<< HEAD
                res.send("Username and password do not match.");
            }
        }
        else {
            res.send("User does not exist");
=======
                res.render("error", { message: "Username and password do not match." });
            }
        }
        else {
            res.render("error", { message: "User does not exist" });
>>>>>>> 0502efdad6d9debd9f4ebf8003e6a76ac970f5c9
        }
    });
});
/* GET register page. */
router.get('/', function (req, res) {
    res.clearCookie('_id');
    res.render('signin', { title: 'Sign In!' });
});
module.exports = router;
