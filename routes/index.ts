/// <reference path='..\types\DefinitelyTyped\node\node.d.ts'/>

/// <reference path='..\types\DefinitelyTyped\express\express.d.ts'/>

interface UserInterface {

    getName(): string;
    getEmail(): string;

}

class User implements UserInterface {
    private name: string;
    private email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }
}

class Router {

    constructor() { }

    startRouter() {
        var express = require('express');
        var router = express.Router();

        /* GET home page. */
        router.get('/', function(req, res, next) {
            res.render('index', { title: 'Express' });
        });

        /* GET Userlist page. */
        router.get('/userlist', function(req, res) {
            var db = req.db;
            var collection = db.get('usercollection');
            collection.find({}, {}, function(e, docs) {
                res.render('userlist', {
                    "userlist": docs
                });
            });
        });

        /* GET New User page. */
        router.get('/newuser', function(req, res) {
            res.render('newuser', { title: 'Add New User' });
        });
	
        /* GET Sign Up page. */
        router.get('/signup', function(req, res) {
            res.render('signup', { title: 'Register' });
        });

        /* POST to Add User Service */
        router.post('/adduser', function(req, res) {

            // Set our internal DB variable
            var db = req.db;

            // Get our form values. These rely on the "name" attributes
            var userName = req.body.username;
            var userEmail = req.body.useremail;

            var user = new User(userName, userEmail);
		
            // Set our collection
            var collection = db.get('usercollection');

            // Submit to the DB
            collection.insert({
                "username": user.getName(),
                "email": user.getEmail()
            }, function(err, doc) {
                if (err) {
                    // If it failed, return error
                    res.send("There was a problem adding the information to the database.");
                }
                else {
                    // And forward to success page
                    res.redirect("userlist");
                }
            });
        });

        module.exports = router;
    }
}

var router = new Router();
router.startRouter();