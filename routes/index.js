/// <reference path='..\types\DefinitelyTyped\node\node.d.ts'/>
/// <reference path='..\types\DefinitelyTyped\express\express.d.ts'/>
var Router = (function () {
    function Router() { }
    Router.prototype.startRouter = function () {
        var express = require('express');
        var router = express.Router();
        router.use('/register', require('./register'));
        router.use('/signin', require('./signin'));
        router.use('/viewer', require('./viewer'));
        router.use('/contributor', require('./contributor'));
        router.use('/profile', require('./profile'));
        router.use('/accountsettings', require('./accountsettings'));
        router.use('/webcomic', require('./webcomic'));
        router.use('/logout', require('./logout'));
        router.use('/home', require('./home'));
        /* GET home page. */
        router.get('/', function (req, res, next) {
            res.render('index', { title: 'HerroPrease' });
        });
        module.exports = router;
    };
    return Router;
})();
var router = new Router();
router.startRouter();
