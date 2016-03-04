var express = require('express');
var router = express.Router();
/* GET forgotpassword page. */
router.get('/', function (req, res) {
    res.render('forgotpassword', { title: 'Recover your account' });
});
/* POST to  into the system. */
router.post('/', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    registeredUsers.findOne({ username: req.body.username }, function (err, user) {
        if (user) {
        }
        else {
            res.render("error", { message: "User does not exist" });
        }
    });
});
module.exports = router;
