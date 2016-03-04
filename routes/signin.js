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
                res.render("error", { message: "Username and password do not match." });
            }
        }
        else {
            res.render("error", { message: "User does not exist" });
        }
    });
});
/* GET forgotpassword page. */
router.get('/forgotpassword', function (req, res) {
    //res.render('forgotposse', { title: 'Sign In!' });
});
/* PUT forgotpassword page to send user's answer. */
router.put('/forgotpassword', function (req, res) {
    //res.render('resetpassword', { title: 'Sign In!' });
});
/* PUT forgotpassword page to send user's answer. */
router.put('/forgotpassword', function (req, res) {
    //res.render('since', { title: 'Sign In!' });
});
/* GET register page. */
router.get('/', function (req, res) {
    res.clearCookie('_id');
    res.render('signin', { title: 'Sign In!' });
});
module.exports = router;
