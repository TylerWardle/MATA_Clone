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
        router.use('/home', require('./home'));
        router.use('/contributor', require('./contributor'));
        router.use('/profile', require('./profile'));
        router.use('/chat', require('./chat'));
        router.use('/history', require('./history'));
        router.use('/edit', require('./profile'));
        router.use('/accountsettings', require('./accountsettings'));
        router.use('/logout', require('./logout'));
        router.use('/webcomic', require('./webcomic'));
        router.use('/forgotpassword', require('./forgotpassword'));
        router.use('/forgotpassword/recover', require('./forgotpassword'));
        router.use('/forgotpassword/reset', require('./forgotpassword'));
        router.use('/SearchBrowseResults', require('./SearchBrowseResults'));
        router.use('/chat', require('./chat'));
        router.use('/browse', require('./browse'));
        router.use('/chatAlternate', require('./chatAlternate'));
        router.use('/comment', require('./comment'));
        /* GET home page. */
        router.get('/', function (req, res, next) {
            res.render('index', { title: 'MATA_WEBCOMICS' });
        });
        module.exports = router;
    };
    return Router;
})();
var router = new Router();
router.startRouter();
