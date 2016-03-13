var express = require('express');
var router = express.Router();
/* GET forgotpassword page. */
router.get('/', function (req, res) {
    res.clearCookie('_id');
    res.clearCookie('_username');
    res.render('forgotpassword', { title: 'Recover Your Account' });
});
/* POST to  into the system. */
router.post('/', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    registeredUsers.findOne({ username: req.body.username }, function (err, user) {
        if (user) {
            res.cookie('_username', user.username);
            res.render('recoveraccount', { title: 'Verify Your Identity',
                securityQuestion: user.securityQuestion });
        }
        else {
            res.render("error", { message: "User Does Not Exist" });
        }
    });
});
/* POST to */
router.post('/recover', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    registeredUsers.findOne({ username: req.cookies._username }, function (err, user) {
        if (user.securityAnswer === req.body.securityAnswer) {
            res.cookie('_id', user._id);
            res.render('resetpassword', { title: 'Access Granted! Reset Your Password' });
        }
        else {
            res.render("recoveraccount", { title: "Secret Answer Incorrect" });
        }
    });
});
router.post('/reset', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    registeredUsers.findOne({ username: req.cookies._username }, function (err, user) {
        if (user) {
            registeredUsers.update({ username: req.cookies._username }, {
                $set: {
                    password: req.body.password
                }
            });
            res.render('signin', { title: 'Your password was successfully reset! Sign in!' });
        }
        else {
            res.render("error", { message: "Secret Answer Incorrect" });
        }
    });
});
module.exports = router;
