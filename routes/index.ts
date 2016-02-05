/// <reference path='..\types\DefinitelyTyped\node\node.d.ts'/>
/// <reference path='..\types\DefinitelyTyped\express\express.d.ts'/>

var Router = (function () {
    function Router() {}
	
    Router.prototype.startRouter = function () {
        var express = require('express');
        var router = express.Router();
		
        router.use('/register', require('./register'));
        router.use('/signin', require('./signin'));
        router.use('/homepage', require('./homepage'));
		
        //router.use('/accountsettings', require('./accountsettings'));
        //router.use('/webcomic', require('./webcomic'));
		
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