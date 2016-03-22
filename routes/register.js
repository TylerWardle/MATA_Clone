///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var RSProvider = require('../services/RegisteredUserServiceProvider');
var Register = (function () {
    function Register() {
    }
    Register.prototype.startRegister = function () {
        var express = require('express');
        var router = express.Router();
        var registeredUserServiceProvider = new RSProvider.RegisteredUserServiceProvider();
        /* POST register (adds a new user to the system). */
        router.post('/', function (req, res) {
            if (registeredUserServiceProvider.create(req, res)) {
                res.redirect("signin");
            }
            else {
                res.render("error", { message: "username " + req.body.username + " is already taken!" });
            }
        });
        /* GET register page. */
        router.get('/', function (req, res) {
            res.render('register', { title: 'Register!' });
        });
        module.exports = router;
    };
    return Register;
})();
var register = new Register();
register.startRegister();
