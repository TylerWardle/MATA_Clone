var RSProvider = require('../services/RegisteredUserServiceProvider');
var express = require('express');
var router = express.Router();
var registeredUserServiceProvider = new RSProvider.RegisteredUserServiceProvider();
/* POST register (adds a new user to the system). */
router.post('/', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    if (registeredUserServiceProvider.create(registeredUsers, req, res))
        res.redirect("signin");
});
/* GET register page. */
router.get('/', function (req, res) {
    res.render('register', { title: 'Register!' });
});
module.exports = router;
