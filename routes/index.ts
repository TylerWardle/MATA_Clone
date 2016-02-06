/// <reference path='..\types\DefinitelyTyped\node\node.d.ts'/>
/// <reference path='..\types\DefinitelyTyped\express\express.d.ts'/>

class Router {

    constructor() { }

    startRouter() {
        var express = require('express');
        var router = express.Router();

        //include other routes
        router.use('/register', require('./register'));
        router.use('/users', require('./users'));
        router.use('/userList', require('./userList'));
        router.use('/contributor', require('./contributor'));
        router.use('/accountsettings', require('./accountsettings'));
        router.use('/webcomic', require('./webcomic'));
        router.use('/viewer', require('./viewer'));

        /* GET home page. */
        router.get('/', function(req, res, next) {
            res.render('index', { title: 'Express' });
        });

        module.exports = router;
    }
}

var router = new Router();
router.startRouter();